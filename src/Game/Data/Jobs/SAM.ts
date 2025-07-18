import { ensureRecord } from "../../../utilities";
import { ActionData, CooldownData, ResourceData, TraitData } from "../types";

export const SAM_ACTIONS = ensureRecord<ActionData>()({
	ENPI: {
		id: 7486,
		name: "Enpi",
		label: { zh: "燕飞" },
	},
	HAKAZE: {
		id: 7477,
		name: "Hakaze",
		label: { zh: "刃风" },
	},
	GYOFU: {
		id: 36963,
		name: "Gyofu",
		label: { zh: "晓风" },
	},
	YUKIKAZE: {
		id: 7480,
		name: "Yukikaze",
		label: { zh: "雪风" },
	},
	JINPU: {
		id: 7478,
		name: "Jinpu",
		label: { zh: "阵风" },
	},
	GEKKO: {
		id: 7481,
		name: "Gekko",
		label: { zh: "月光" },
	},
	SHIFU: {
		id: 7479,
		name: "Shifu",
		label: { zh: "士风" },
	},
	KASHA: {
		id: 7482,
		name: "Kasha",
		label: { zh: "花车" },
	},
	FUGA: {
		id: 7483,
		name: "Fuga",
		label: { zh: "风雅" },
	},
	FUKO: {
		id: 25780,
		name: "Fuko",
		label: { zh: "风光" },
	},
	MANGETSU: {
		id: 7484,
		name: "Mangetsu",
		label: { zh: "满月" },
	},
	OKA: {
		id: 7485,
		name: "Oka",
		label: { zh: "樱花" },
	},
	MEIKYO_SHISUI: {
		id: 7499,
		name: "Meikyo Shisui",
		label: { zh: "明镜止水" },
	},
	IKISHOTEN: {
		id: 16482,
		name: "Ikishoten",
		label: { zh: "意气冲天" },
	},
	HISSATSU_SHINTEN: {
		id: 7490,
		name: "Hissatsu: Shinten",
		label: { zh: "必杀剑·震天" },
	},
	HISSATSU_KYUTEN: {
		id: 7491,
		name: "Hissatsu: Kyuten",
		label: { zh: "必杀剑·九天" },
	},
	HISSATSU_GYOTEN: {
		id: 7492,
		name: "Hissatsu: Gyoten",
		label: { zh: "必杀剑·晓天" },
	},
	HISSATSU_YATEN: {
		id: 7493,
		name: "Hissatsu: Yaten",
		label: { zh: "必杀剑·夜天" },
	},
	HISSATSU_SENEI: {
		id: 16481,
		name: "Hissatsu: Senei",
		label: { zh: "必杀剑·闪影" },
	},
	HISSATSU_GUREN: {
		id: 7496,
		name: "Hissatsu: Guren",
		label: { zh: "必杀剑·红莲" },
	},
	HAGAKURE: {
		id: 7495,
		name: "Hagakure",
		label: { zh: "叶隐" },
	},
	IAIJUTSU: {
		id: 7867,
		name: "Iaijutsu",
		label: { zh: "居合术" },
	},
	TSUBAME_GAESHI: {
		id: 16483,
		name: "Tsubame-gaeshi",
		label: { zh: "燕回返" },
	},
	SHOHA: {
		id: 16487,
		name: "Shoha",
		label: { zh: "照破" },
	},
	THIRD_EYE: {
		id: 7498,
		name: "Third Eye",
		label: { zh: "心眼" },
	},
	TENGENTSU: {
		id: 36962,
		name: "Tengentsu",
		label: { zh: "天眼通" },
	},
	OGI_NAMIKIRI: {
		id: 25781,
		name: "Ogi Namikiri",
		label: { zh: "奥义斩浪" },
	},
	KAESHI_NAMIKIRI: {
		id: 25782,
		name: "Kaeshi: Namikiri",
		label: { zh: "回返斩浪" },
	},
	ZANSHIN: {
		id: 36964,
		name: "Zanshin",
		label: { zh: "残心" },
	},
	MEDITATE: {
		id: 7497,
		name: "Meditate",
		label: { zh: "默想" },
	},

	HIGANBANA: {
		id: 7489,
		name: "Higanbana",
		label: { zh: "彼岸花" },
	},
	TENKA_GOKEN: {
		id: 7488,
		name: "Tenka Goken",
		label: { zh: "天下五剑" },
	},
	KAESHI_GOKEN: {
		id: 16485,
		name: "Kaeshi: Goken",
		label: { zh: "回返五剑" },
	},
	TENDO_GOKEN: {
		id: 36965,
		name: "Tendo Goken",
		label: { zh: "天道五剑" },
	},
	TENDO_KAESHI_GOKEN: {
		id: 36967,
		name: "Tendo Kaeshi Goken",
		label: { zh: "天道回返五剑" },
	},
	MIDARE_SETSUGEKKA: {
		id: 7487,
		name: "Midare Setsugekka",
		label: { zh: "纷乱雪月花" },
	},
	KAESHI_SETSUGEKKA: {
		id: 16486,
		name: "Kaeshi: Setsugekka",
		label: { zh: "回返雪月花" },
	},
	TENDO_SETSUGEKKA: {
		id: 36966,
		name: "Tendo Setsugekka",
		label: { zh: "天道雪月花" },
	},
	TENDO_KAESHI_SETSUGEKKA: {
		id: 36968,
		name: "Tendo Kaeshi Setsugekka",
		label: { zh: "天道回返雪月花" },
	},

	THIRD_EYE_POP: { name: "Pop Third Eye", label: { zh: "心眼触发" } },
	TENGENTSU_POP: { name: "Pop Tengentsu", label: { zh: "天眼通触发" } },
});

export const SAM_COOLDOWNS = ensureRecord<CooldownData>()({
	cd_YATEN: { name: "cd_Yaten", label: { zh: "CD：夜天" } }, // [0, 10],
	cd_GYOTEN: { name: "cd_Gyoten", label: { zh: "CD：晓天" } }, // [0, 10],
	cd_SENEI_GUREN: { name: "cd_Senei", label: { zh: "CD: 闪影/红莲" } }, // [0,60],
	cd_SHINTEN: { name: "cd_Shinten", label: { zh: "CD：震天" } }, // [0,1]
	cd_KYUTEN: { name: "cd_Kyuten", label: { zh: "CD：九天" } }, // [0,1]
	cd_MEDITATE: { name: "cd_Meditate" }, // [0, 1]
	cd_IKISHOTEN: { name: "cd_Ikishoten" }, // [0, 120]
	cd_ZANSHIN: { name: "cd_Zanshin" }, // [0, 1]
	cd_HAGAKURE: { name: "cd_Hagakure" }, // [0, 1]
	cd_SHOHA: { name: "cd_Shoha" },
	cd_MEIKYO_SHISUI: { name: "cd_MeikyoShisui" },
	cd_THIRD_EYE: { name: "cd_ThirdEye" },
	cd_THIRD_EYE_POP: { name: "cd_ThirdEyePop" }, // [0, 1,], not real
});

export const SAM_GAUGES = ensureRecord<ResourceData>()({
	KENKI: { name: "Kenki", label: { zh: "剑气" } }, // [0, 100]
	SETSU: { name: "Setsu", label: { zh: "雪闪" } }, // [0, 1]
	GETSU: { name: "Getsu", label: { zh: "月闪" } }, // [0, 1]
	KA_SEN: { name: "Ka", label: { zh: "花闪" } }, // [0, 1]
	MEDITATION: { name: "Meditation", label: { zh: "默想" } }, // [0, 3]
});
export const SAM_STATUSES = ensureRecord<ResourceData>()({
	MEIKYO_SHISUI: { name: "Meikyo Shisui", label: { zh: "明镜止水" }, maximumStacks: 3 }, // [0, 3]
	FUGETSU: { name: "Fugetsu", label: { zh: "风月" } }, // [0, 1]
	FUKA: { name: "Fuka", label: { zh: "风花" } }, // [0, 1]
	ZANSHIN_READY: { name: "Zanshin Ready", label: { zh: "残心预备" } }, // [0, 1]
	TENDO: { name: "Tendo", label: { zh: "天道" } }, // [0, 1]
	OGI_READY: { name: "Ogi Namikiri Ready", label: { zh: "奥义斩浪预备" } }, // [0, 1]
	TSUBAME_GAESHI_READY: { name: "Tsubame-gaeshi Ready", label: { zh: "燕回返预备" } }, // [0, 1]
	THIRD_EYE: { name: "Third Eye", label: { zh: "心眼" } }, // [0, 1]
	TENGENTSU: { name: "Tengentsu", label: { zh: "天眼通" } }, // [0, 1]
	TENGENTSUS_FORESIGHT: { name: "Tengentsu's Foresight", label: { zh: "通天眼" } }, // [0, 1]
	MEDITATE: { name: "Meditate", label: { zh: "默想" } }, // [0, 5]
	ENHANCED_ENPI: { name: "Enhanced Enpi", label: { zh: "燕飞效果提高" } }, // [0, 1]
	HIGANBANA_DOT: { name: "HiganbanaDoT", label: { zh: "彼岸花dot" } }, // [0, 1]
});

export const SAM_TRACKERS = ensureRecord<ResourceData>()({
	SAM_TWO_READY: { name: "SAMTwoReady", label: { zh: "连击2预备" } }, // [0, 1] for jinpu/shifu
	SAM_TWO_AOE_READY: { name: "SAMTwoAoeReady", label: { zh: "AOE2预备" } }, // [0, 1] for mangetsu/oka
	GEKKO_READY: { name: "GekkoReady", label: { zh: "月光预备" } }, // [0, 1]
	KASHA_READY: { name: "KashaReady", label: { zh: "花车预备" } }, // [0, 1]
	KAESHI_OGI_READY: { name: "KaeshiOgiReady", label: { zh: "回返斩浪预备" } }, // [0 , 1]

	// samurai kaeshi resources (behind the scenes)
	// 0 - nothing, 1 - kaeshi goken, 2 - tendo kaeshi goken, 3 - kaeshi midare, 4 - tendo kaeshi midare
	KAESHI_TRACKER: { name: "KaeshiTracker", label: { zh: "回返状态" } }, // [0, 4]
});

export const SAM_TRAITS = ensureRecord<TraitData>()({
	ENHANCED_IAIJUTSU: { name: "Enhanced Iaijutsu", level: 74 },
	ENHANCED_MEIKYO_SHISUI: { name: "Enhanced Meikyo Shisui", level: 76 },
	ENHANCED_FUGETSU_AND_FUKA: { name: "Enhanced Fugetsu and Fuka", level: 78 },
	THIRD_EYE_MASTERY: { name: "Third Eye Mastery", level: 82 },
	WAY_OF_THE_SAMURAI_II: { name: "Way of the Samurai II", level: 84 },
	FUGA_MASTERY: { name: "Fuga Mastery", level: 86 },
	ENHANCED_IKISHOTEN: { name: "Enhanced Ikishoten", level: 90 },
	HAKAZE_MASTERY: { name: "Hakaze Mastery", level: 92 },
	ENHANCED_HISSATSU: { name: "Enhanced Hissatsu", level: 94 },
	WAY_OF_THE_SAMURAI_III: { name: "Way of the Samurai III", level: 94 },
	ENHANCED_IKISHOTEN_II: { name: "Enhanced Ikishoten II", level: 96 },
	ENHANCED_MEIKYO_SHISUI_II: { name: "Enhanced Meikyo Shisui II", level: 100 },
});

export type SAMActions = typeof SAM_ACTIONS;
export type SAMActionKey = keyof SAMActions;

export type SAMCooldowns = typeof SAM_COOLDOWNS;
export type SAMCooldownKey = keyof SAMCooldowns;

export type SAMGauges = typeof SAM_GAUGES;
export type SAMGaugeKey = keyof SAMGauges;

export type SAMStatuses = typeof SAM_STATUSES;
export type SAMStatusKey = keyof SAMStatuses;

export type SAMTrackers = typeof SAM_TRACKERS;
export type SAMTrackerKeys = keyof SAMTrackers;

export const SAM_RESOURCES = {
	...SAM_GAUGES,
	...SAM_STATUSES,
	...SAM_TRACKERS,
};
export type SAMResources = typeof SAM_RESOURCES;
export type SAMResourceKey = keyof SAMResources;

export type SAMTraits = typeof SAM_TRAITS;
export type SAMTraitKey = keyof SAMTraits;
