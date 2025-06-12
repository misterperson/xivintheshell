import { VPRStatusPropsGenerator } from "../../Components/Jobs/VPR";
import { StatusPropsGenerator } from "../../Components/StatusDisplay";
import { ActionNode } from "../../Controller/Record";
import { ActionKey, TraitKey } from "../Data";
import { Aspect, BuffType, LevelSync } from "../Common";
import { VPRResourceKey, VPRActionKey, VPRCooldownKey } from "../Data/Jobs/VPR";
import { CommonActionKey } from "../Data/Shared/Common";
import { RoleActionKey } from "../Data/Shared/Role";
import { GameConfig } from "../GameConfig";
import { GameState, PlayerState } from "../GameState";
import { makeComboModifier, makePositionalModifier, Modifiers, PotencyModifier } from "../Potency";
import { CoolDown, makeResource } from "../Resources";
import {
	Ability,
	combineEffects,
	combinePredicatesAnd,
	ConditionalSkillReplace,
	CooldownGroupProperties,
	EffectFn,
	getBasePotency,
	getSkill,
	makeAbility,
	MakeAbilityParams,
	MakeGCDParams,
	makeResourceAbility,
	MakeResourceAbilityParams,
	makeSpell,
	makeWeaponskill,
	MOVEMENT_SKILL_ANIMATION_LOCK,
	NO_EFFECT,
	PotencyModifierFn,
	ResourceCalculationFn,
	Skill,
	StatePredicate,
	Weaponskill,
} from "../Skills";
import { VPRResourceType } from "../Constants/VPR";


const makeVPRResource = (
	rsc: VPRResourceKey,
	maxValue: number,
	params?: { timeout?: number; default?: number },
) => {
	makeResource("VPR", rsc, maxValue, params ?? {});
};

// Gauges
makeVPRResource("RATTLING_COIL", 3);
makeVPRResource("SERPENT_OFFERINGS", 100);
makeVPRResource("ANGUINE_TRIBUTE", 5);

// Self-buffs
makeVPRResource("HUNTERS_INSTINCTS", 1, { timeout: 40 });
makeVPRResource("SWIFTSCALED", 1, { timeout: 40 });

// Starters
makeVPRResource("HONED_STEEL", 1, { timeout: 60 });
makeVPRResource("HONED_REAVERS", 1, { timeout: 60 });

// Single-target finishers
makeVPRResource("FLANKSTUNG_VENOM", 1, { timeout: 60 });
makeVPRResource("HINDSTUNG_VENOM", 1, { timeout: 60 });
makeVPRResource("FLANKSBANE_VENOM", 1, { timeout: 60 });
makeVPRResource("HINDSBANE_VENOM", 1, { timeout: 60 });

// AoE finishers
makeVPRResource("GRIMSKINS_VENOM", 1, { timeout: 30 });
makeVPRResource("GRIMHUNTERS_VENOM", 1, { timeout: 30 });

// Coil oGCD buffs
makeVPRResource("HUNTERS_VENOM", 1, { timeout: 30 });
makeVPRResource("SWIFTSKINS_VENOM", 1, { timeout: 30 });

// Uncoiled Fury oGCD buffs
makeVPRResource("POISED_FOR_TWINBLOOD", 1, { timeout: 60 });
makeVPRResource("POISED_FOR_TWINFANG", 1, { timeout: 60 });

// Den oGCD buffs
makeVPRResource("FELLHUNTERS_VENOM", 1, { timeout: 30 });
makeVPRResource("FELLSKINS_VENOM", 1, { timeout: 30 });

makeVPRResource("READY_TO_REAWAKEN", 1, { timeout: 30 });
makeVPRResource("REAWAKENED", 1, { timeout: 30 });

// These all are cleared on using a Weaponskill (or Spell), not on a timeout.
makeVPRResource("DEATH_RATTLE_READY", 1);
makeVPRResource("COIL_OGCD_READY", 2);
makeVPRResource("DEN_OGCD_READY", 2);
makeVPRResource("UNCOILED_OGCD_READY", 2);
// In addition to using GCD actions, Legacies are cleared when leaving Reawaken
makeVPRResource("LEGACY_READY", 4);

makeVPRResource("VPR_COMBO", 4, { timeout: 30 });
makeVPRResource("VPR_AOE_COMBO", 2, { timeout: 30 });
makeVPRResource("REAWAKEN_COMBO", 4);

export class VPRState extends GameState {
	constructor(config: GameConfig) {
		super(config);

		this.registerRecurringEvents();
	}

	override get statusPropsGenerator(): StatusPropsGenerator<VPRState> {
		return new VPRStatusPropsGenerator(this);
	}

	getSwiftscaledModifier(): number {
		if (!this.hasResourceAvailable("SWIFTSCALED")) {
			return 0;
		}

		return 15;
	}

	// All of these procs are mutually-exclusive with each-other.
	clearProcs() {
		if (this.tryConsumeResource("DEATH_RATTLE_READY")) {
			return;
		}
		if (this.tryConsumeResource("LAST_LASH_READY")) {
			return;
		}
		if (this.tryConsumeResource("COIL_OGCD_READY")) {
			this.tryConsumeResource("HUNTERS_VENOM") || this.tryConsumeResource("SWIFTSKINS_VENOM");
			return;
		}
		if (this.tryConsumeResource("UNCOILED_OGCD_READY", true)) {
			this.tryConsumeResource("POISED_FOR_TWINFANG") || this.tryConsumeResource("POISED_FOR_TWINBLOOD");
			return;
		}
		if (this.tryConsumeResource("DEN_OGCD_READY", true)) {
			this.tryConsumeResource("FELLHUNTERS_VENOM") || this.tryConsumeResource("FELLSKINS_VENOM");
			return;
		}
		if (this.tryConsumeResource("LEGACY_READY", true)) {
			return;
		}
	}

	clearComboEnders() {
		if (this.tryConsumeResource("FLANKSBANE_VENOM")) {
			return;
		}
		if (this.tryConsumeResource("HINDSBANE_VENOM")) {
			return;
		}
		if (this.tryConsumeResource("FLANKSTUNG_VENOM")) {
			return;
		}
		if (this.tryConsumeResource("HINDSTUNG_VENOM")) {
			return;
		}
		if (this.tryConsumeResource("GRIMHUNTERS_VENOM")) {
			return;
		}
		if (this.tryConsumeResource("GRIMSKINS_VENOM")) {
			return;
		}
	}

	setTimedResource(rscType: VPRResourceKey, amount: number) {
		this.tryConsumeResource(rscType);
		this.resources.get(rscType).gain(amount);
		this.enqueueResourceDrop(rscType);
	}

	processCombo(skill: VPRActionKey) {
		const currCombo = this.resources.get("VPR_COMBO").availableAmount();
		const currAoeCombo = this.resources.get("VPR_AOE_COMBO").availableAmount();

		let [newCombo, newAoeCombo] = new Map<VPRActionKey, [number, number]>([
			["STEEL_FANGS", [1, 0]],
			["REAVING_FANGS", [1, 0]],
			["HUNTERS_STING", [2, 0]],
			["SWIFTSKINS_STING", [3, 0]],
			["FLANKSTING_STRIKE", [0, 0]],
			["FLANKSBANE_FANG", [0, 0]],
			["HINDSTING_STRIKE", [0, 0]],
			["HINDSBANE_FANG", [0, 0]],
			["STEEL_MAW", [0, 1]],
			["REAVING_MAW", [0, 1]],
			["HUNTERS_BITE", [0, 2]],
			["SWIFTSKINS_BITE", [0, 2]],
			["JAGGED_MAW", [0, 0]],
			["BLOODIED_MAW", [0, 0]],
		]).get(skill) ?? [currCombo, currAoeCombo]; // Any other gcd leaves combo unchanged

		if (newCombo !== currCombo) this.setComboState("VPR_COMBO", newCombo);
		if (newAoeCombo !== currAoeCombo) this.setComboState("VPR_AOE_COMBO", newAoeCombo);
	}

	cancelVicewinderCombo() {
		this.tryConsumeResource("HUNTERS_COIL_READY", true);
		this.tryConsumeResource("SWIFTSKINS_COIL_READY", true);
		this.tryConsumeResource("HUNTERS_DEN_READY", true);
		this.tryConsumeResource("SWIFTSKINS_DEN_READY", true);
	}

	cancelReawaken() {
		this.tryConsumeResource("LEGACY_READY", true);
		this.tryConsumeResource("ANGUINE_TRIBUTE", true);
		this.tryConsumeResource("REAWAKENED");
		this.setComboState("REAWAKEN_COMBO", 0);
	}
}

const makeVPRWeaponskill = (
	name: VPRActionKey,
	unlockLevel: number,
	params: {
		replaceIf?: ConditionalSkillReplace<VPRState>[];
		startOnHotbar?: boolean;
		potency: number | Array<[TraitKey, number]>;
		potencyModifier?: {
			addedPotency: number
			resource: VPRResourceKey
		}
		positional?: {
			potency?: number | Array<[TraitKey, number]>;
			location: "flank" | "rear";
		};
		secondaryCooldown?: CooldownGroupProperties;
		recastTime: number | ResourceCalculationFn<VPRState>;
		falloff?: number;
		applicationDelay?: number;
		jobPotencyModifiers?: PotencyModifierFn<VPRState>;
		onConfirm?: EffectFn<VPRState>;
		validateAttempt?: StatePredicate<VPRState>;
		onApplication?: EffectFn<VPRState>;
		highlightIf?: StatePredicate<VPRState>;
	},
): Weaponskill<VPRState> => {
	return makeWeaponskill("VPR", name, unlockLevel, {
		...params
	})
}

const makeVPRAbility = (
	name: VPRActionKey,
	unlockLevel: number,
	cdName: VPRCooldownKey,
	params: Partial<MakeAbilityParams<VPRState>>,
): Ability<VPRState> => {
	return makeAbility("VPR", name, unlockLevel, cdName, {
		...params,
	});
};

const makeVPRResourceAbility = (
	name: VPRActionKey,
	unlockLevel: number,
	cdName: VPRCooldownKey,
	params: MakeResourceAbilityParams<VPRState>,
): Ability<VPRState> => {
	return makeResourceAbility("VPR", name, unlockLevel, cdName, params);
};

const firstGenerationCondition: ConditionalSkillReplace<VPRState> = {
	newSkill: "FIRST_GENERATION",
	condition: (state) => state.hasResourceAvailable("REAWAKENED")
}

const huntersStingCondition: ConditionalSkillReplace<VPRState> = {
	newSkill: "HUNTERS_STING",
	condition: (state) => !state.hasResourceAvailable("REAWAKENED") && state.resources.get("VPR_COMBO").availableAmount() == 1,
}

const flankstingStrikeCondition: ConditionalSkillReplace<VPRState> = {
	newSkill: "FLANKSTING_STRIKE",
	condition: (state) => !state.hasResourceAvailable("REAWAKENED") && state.resources.get("VPR_COMBO").availableAmount() == 2,
}

const hindstingStrikeCondition: ConditionalSkillReplace<VPRState> = {
	newSkill: "HINDSTING_STRIKE",
	condition: (state) => !state.hasResourceAvailable("REAWAKENED") && state.resources.get("VPR_COMBO").availableAmount() == 3,
}

makeVPRWeaponskill("STEEL_FANGS", 1, {
	startOnHotbar: true,
	replaceIf: [
		firstGenerationCondition,
		huntersStingCondition,
		flankstingStrikeCondition,
		hindstingStrikeCondition,
	],
	potency: [
		["NEVER", 140], // ?
		["MELEE_MASTERY_VPR", 200],
	],
	recastTime: (state) => state.config.adjustedSksGCD(2.5, state.getSwiftscaledModifier()),
	onConfirm: (state) => {
		state.tryConsumeResource("HONED_STEEL");
		state.setTimedResource("HONED_REAVERS", 1);
	},
	highlightIf: (state) => state.hasResourceAvailable("HONED_STEEL"),
	validateAttempt: (state) => !state.hasResourceAvailable("REAWAKENED") && state.resources.get("VPR_COMBO").availableAmount() == 0,
})

const secondGenerationCondition: ConditionalSkillReplace<VPRState> = {
	newSkill: "SECOND_GENERATION",
	condition: (state) => state.hasResourceAvailable("REAWAKENED")
}

const swiftskinsStingCondition: ConditionalSkillReplace<VPRState> = {
	newSkill: "SWIFTSKINS_STING",
	condition: (state) => !state.hasResourceAvailable("REAWAKENED") && state.resources.get("VPR_COMBO").availableAmount() == 1,
}

const flanksbaneFangCondition: ConditionalSkillReplace<VPRState> = {
	newSkill: "FLANKSBANE_FANG",
	condition: (state) => !state.hasResourceAvailable("REAWAKENED") && state.resources.get("VPR_COMBO").availableAmount() == 2,
}

const hindsbaneFangCondition: ConditionalSkillReplace<VPRState> = {
	newSkill: "HINDSBANE_FANG",
	condition: (state) => !state.hasResourceAvailable("REAWAKENED") && state.resources.get("VPR_COMBO").availableAmount() == 3,
}

makeVPRWeaponskill("REAVING_FANGS", 10, {
	startOnHotbar: true,
	replaceIf: [
		secondGenerationCondition,
		swiftskinsStingCondition,
		flanksbaneFangCondition,
		hindsbaneFangCondition,
	],
	potency: [
		["NEVER", 140], // ?
		["MELEE_MASTERY_VPR", 200],
	],
	recastTime: (state) => state.config.adjustedSksGCD(2.5, state.getSwiftscaledModifier()),
	onConfirm: (state) => {
		state.tryConsumeResource("HONED_REAVERS");
		state.setTimedResource("HONED_STEEL", 1);
	},
	highlightIf: (state) => state.hasResourceAvailable("HONED_REAVERS"),
	validateAttempt: (state) => !state.hasResourceAvailable("REAWAKENED") && state.resources.get("VPR_COMBO").availableAmount() == 0,
})

makeVPRWeaponskill("VICEWINDER", 65, {
	recastTime: (state) => state.config.adjustedSksGCD(3.0, state.getSwiftscaledModifier()),
	secondaryCooldown: {
		cdName: "cd_VICEWINDER",
		cooldown: 40,
		maxCharges: 2,
	},
	potency: 500,
	validateAttempt: (state) => (!state.hasResourceAvailable("REAWAKENED") &&
		!state.hasResourceAvailable("HUNTERS_COIL_READY") &&
		!state.hasResourceAvailable("SWIFTSKINS_COIL_READY") &&
		!state.hasResourceAvailable("HUNTERS_DEN_READY") &&
		!state.hasResourceAvailable("SWIFTSKINS_DEN_READY")),
	onConfirm: (state) => {
		state.resources.get("RATTLING_COIL").gain(1);
		state.setTimedResource("HUNTERS_COIL_READY", 1);
		state.setTimedResource("SWIFTSKINS_COIL_READY", 1);
	}
})

makeVPRWeaponskill("VICEWINDER", 65, {
	recastTime: (state) => state.config.adjustedSksGCD(3.0, state.getSwiftscaledModifier()),
	secondaryCooldown: {
		cdName: "cd_VICEWINDER",
		cooldown: 40,
		maxCharges: 2,
	},
	potency: 570,
	positional: { potency: 620, location: "flank" },
	validateAttempt: (state) => state.hasResourceAvailable("HUNTERS_COIL_READY"),
	onConfirm: (state) => {
		state.tryConsumeResource("HUNTERS_COIL_READY");
	}
})
