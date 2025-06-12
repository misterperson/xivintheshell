import { ensureRecord } from "../../../utilities";
import { ActionData, CooldownData, ResourceData, TraitData } from "../types";

export const VPR_ACTIONS = ensureRecord<ActionData>()({
	/** Single-target GCD */
	STEEL_FANGS: { name: "Steel Fangs" },
	REAVING_FANGS: { name: "Reaving Fangs" },
	WRITHING_SNAP: { name: "Writhing Snap" },
	HUNTERS_STING: { name: "Hunter's Sting" },
	SWIFTSKINS_STING: { name: "Swiftskin's Sting" },
	FLANKSTING_STRIKE: { name: "Flanksting Strike" },
	FLANKSBANE_FANG: { name: "Flanksbane Fang" },
	HINDSTING_STRIKE: { name: "Hindsting Strike" },
	HINDSBANE_FANG: { name: "Hindsbane Fang" },

	VICEWINDER: { name: "Vicewinder" },
	HUNTERS_COIL: { name: "Hunter's Coil" },
	SWIFTSKINS_COIL: { name: "Swiftskin's Coil" },

	UNCOILED_FURY: { name: "Uncoiled Fury" },

	REAWAKEN: { name: "Reawaken" },
	FIRST_GENERATION: { name: "First Generation" },
	SECOND_GENERATION: { name: "Second Generation" },
	THIRD_GENERATION: { name: "Third Generation" },
	FOURTH_GENERATION: { name: "Fourth Generation" },
	OUROBOROS: { name: "Ouroboros" },

	/** Single-target oGCD */
	SERPENTS_TAIL: { name: "Serpent's Tail" },
	DEATH_RATTLE: { name: "Death Rattle" },
	FIRST_LEGACY: { name: "First Legacy" },
	SECOND_LEGACY: { name: "Second Legacy" },
	THIRD_LEGACY: { name: "Third Legacy" },
	FOURTH_LEGACY: { name: "Fourth Legacy" },

	TWINFANG: { name: "Twinfang" },
	TWINBLOOD: { name: "Twinblood" },
	TWINFANG_BITE: { name: "Twinfang Bite" },
	TWINBLOOD_BITE: { name: "Twinblood Bite" },
	UNCOILED_TWINFANG: { name: "Uncoiled Twinfang" },
	UNCOILED_TWINBLOOD: { name: "Uncoiled Twinblood" },

	SERPENTS_IRE: { name: "Serpent's Ire" },

	SLITHER: { name: "Slither" },

	/** Multi-target GCD */
	STEEL_MAW: { name: "Steel Maw" },
	REAVING_MAW: { name: "Reaving Maw" },
	HUNTERS_BITE: { name: "Hunter's Bite" },
	SWIFTSKINS_BITE: { name: "Swiftskin's Bite" },
	JAGGED_MAW: { name: "Jagged Maw" },
	BLOODIED_MAW: { name: "Bloodied Maw" },

	VICEPIT: { name: "Vicepit" },
	HUNTERS_DEN: { name: "Hunter's Den" },
	SWIFTSKINS_DEN: { name: "Swiftskin's Den" },

	/** Multi-target oGCD */
	LAST_LASH: { name: "Last Lash" },

	TWINFANG_THRESH: { name: "Twinfang Thresh" },
	TWINBLOOD_THRESH: { name: "Twinblood Thresh" },
});

export const VPR_COOLDOWNS = ensureRecord<CooldownData>()({
	cd_SERPENTS_IRE: { name: "cd_SerpentsIre" },

	cd_VICEWINDER: { name: "cd_Vicewinder" },

	cd_SLITHER: { name: "cd_Slither" },

	cd_SERPENTS_TAIL: { name: "cd_SerpentsTail" },
	cd_TWINFANG: { name: "cd_Twinfang" },
	cd_TWINBLOOD: { name: "cd_Twinblood" },
});

export const VPR_GAUGES = ensureRecord<ResourceData>()({
	RATTLING_COIL: { name: "Rattling Coil" },
	SERPENT_OFFERINGS: { name: "Serpent Offerings" },
	ANGUINE_TRIBUTE: { name: "Anguine Tribute" },
});

export const VPR_STATUSES = ensureRecord<ResourceData>()({
	HUNTERS_INSTINCTS: { name: "Hunter's Instincts" },
	SWIFTSCALED: { name: "Swiftscaled" },

	HONED_STEEL: { name: "Honed Steel" },
	HONED_REAVERS: { name: "Honed Reavers" },

	FLANKSTUNG_VENOM: { name: "Flankstung Venom" },
	HINDSTUNG_VENOM: { name: "Hindstung Venom" },
	FLANKSBANE_VENOM: { name: "Flanksbane Venom" },
	HINDSBANE_VENOM: { name: "Hindsbane Venom" },

	GRIMSKINS_VENOM: { name: "Grimskin's Venom" },
	GRIMHUNTERS_VENOM: { name: "Grimhunter's Venom" },

	HUNTERS_VENOM: { name: "Hunter's Venom" },
	SWIFTSKINS_VENOM: { name: "Swiftskin's Venom" },

	POISED_FOR_TWINFANG: { name: "Poised for Twinfang" },
	POISED_FOR_TWINBLOOD: { name: "Poised for Twinblood" },

	FELLHUNTERS_VENOM: { name: "Fellhunter's Venom" },
	FELLSKINS_VENOM: { name: "Fellskin's Venom" },

	READY_TO_REAWAKEN: { name: "Ready to Reawaken" },
	REAWAKENED: { name: "Reawakened" },
});

export const VPR_TRACKERS = ensureRecord<ResourceData>()({
	// 0 = no combo
	// 1 = after Steel Fangs or Reaving Fangs
	// 2 = after Hunter's Sting
	// 3 = after Swiftskin's Sting
	VPR_COMBO: { name: "VPR Combo" }, // [ 0, 3 ]
	// Granted by the 3rd step of VPR combo
	DEATH_RATTLE_READY: { name: "Death Rattle Ready" }, // [ 0, 1 ] 

	// 0 = no combo
	// 1 = after Steel Maw or Reaving Maw
	// 2 = after Hunter's Bite or Swiftskin's Bite
	VPR_AOE_COMBO: { name: "VPR AoE Combo" }, // [ 0, 2 ]
	// Granted by the 3rd step of VPR AoE combo
	LAST_LASH_READY: { name: "Last Lash Ready" }, // [ 0, 1 ]

	// Both of these are granted by Vicewinder and both refresh each other
	HUNTERS_COIL_READY: { name: "Hunter's Coil Ready" }, // [ 0, 1 ]
	SWIFTSKINS_COIL_READY: { name: "Swiftskin's Coil Ready" }, // [ 0, 1 ]
	// 2 stacks are granted each by Hunter's Coil and Swiftskin's Coil
	COIL_OGCD_READY: { name: "Coil oGCD Ready" }, // [ 0, 2 ]

	// Both of these are granted by Vicepit and both refresh each other
	HUNTERS_DEN_READY: { name: "Hunter's Den Ready" }, // [ 0, 1 ]
	SWIFTSKINS_DEN_READY: { name: "Swiftskin's Den Ready" }, // [ 0, 1 ]
	// 2 stacks are granted each by Hunter's Den and Swiftskin's Den
	DEN_OGCD_READY: { name: "Den oGCD Ready" }, // [ 0, 2 ]

	// 2 stacks are granted by Uncoiled Fury
	UNCOILED_OGCD_READY: { name: "Uncoiled oGCD Ready" }, // [ 0, 2 ]

	// 0 = no combo
	// 1 = after Reawaken
	// 2 = after First Generation
	// 3 = after Second Generation
	// 4 = after Third Generation
	REAWAKEN_COMBO: { name: "Reawaken Combo" }, // [ 0, 4 ]
	// 0 = no legacy
	// 1 = First Legacy
	// 2 = Second Legacy
	// 3 = Third Legacy
	// 4 = Fourth Legacy
	LEGACY_READY: { name: "Legacy Ready" }, // [ 0, 4 ]
});

export const VPR_TRAITS = ensureRecord<TraitData>()({
	MELEE_MASTERY_VPR: { name: "Melee Mastery", level: 74 },
	VIPERS_BITE: { name: "Viper's Bite", level: 75 },
	VIPERS_THRESH: { name: "Viper's Thresh", level: 80 },
	VIPERS_RATTLE: { name: "Viper's Rattle", level: 82 },
	ENHANCED_SLITHER: { name: "Enhanced Slither", level: 84 },
	MELEE_MASTERY_II_VPR: { name: "Melee Mastery II", level: 84 },
	ENHANCED_VIPERS_RATTLE: { name: "Enhanced Viper's Rattle", level: 88 },
	SERPENTS_LINEAGE: { name: "Serpent's Lineage", level: 90 },
	UNCOILED_FANGS: { name: "Uncoiled Fangs", level: 92 },
	ENHANCED_SERPENTS_LINEAGE: { name: "Enhanced Serpents Lineage", level: 96 },
	SERPENTS_LEGACY: { name: "Serpent's Legacy", level: 100 }
});

export type VPRActions = typeof VPR_ACTIONS;
export type VPRActionKey = keyof VPRActions;

export type VPRCooldowns = typeof VPR_COOLDOWNS;
export type VPRCooldownKey = keyof VPRCooldowns;

export type VPRGauges = typeof VPR_GAUGES;
export type VPRGaugeKey = keyof VPRGauges;

export type VPRStatuses = typeof VPR_STATUSES;
export type VPRStatusKey = keyof VPRStatuses;

export type VPRTrackers = typeof VPR_TRACKERS;
export type VPRTrackerKey = keyof VPRTrackers;

export const VPR_RESOURCES = {
	...VPR_GAUGES,
	...VPR_STATUSES,
	...VPR_TRACKERS,
};
export type VPRResources = typeof VPR_RESOURCES;
export type VPRResourceKey = keyof VPRResources;

export type VPRTraits = typeof VPR_TRAITS;
export type VPRTraitKey = keyof VPRTraits;
