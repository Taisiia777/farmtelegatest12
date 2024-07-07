// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { TGrowthStage } from "../../types/globalTypes";
// import { RootState } from "..";

// export interface IGrowthStages {
//    blocks: [
//       {
//          id: 1;
//          stage: TGrowthStage;
//       },
//       {
//          id: 2;
//          stage: TGrowthStage;
//       },
//       {
//          id: 3;
//          stage: TGrowthStage;
//       },
//       {
//          id: 4;
//          stage: TGrowthStage;
//       },
//       {
//          id: 5;
//          stage: TGrowthStage;
//       },
//       {
//          id: 6;
//          stage: TGrowthStage;
//       },
//       {
//          id: 7;
//          stage: TGrowthStage;
//       },
//       {
//          id: 8;
//          stage: TGrowthStage;
//       },
//       {
//          id: 9;
//          stage: TGrowthStage;
//       }
//    ];

//    // Состояние подсказки в виде пальца
//    isFingerActive: boolean;
// }

// const initialState: IGrowthStages = {
//    blocks: [
//       {
//          id: 1,
//          stage: "fourth",
//       },
//       {
//          id: 2,
//          stage: "fourth",
//       },
//       {
//          id: 3,
//          stage: "fourth",
//       },
//       {
//          id: 4,
//          stage: "fourth",
//       },
//       {
//          id: 5,
//          stage: "fourth",
//       },
//       {
//          id: 6,
//          stage: "fourth",
//       },
//       {
//          id: 7,
//          stage: "fourth",
//       },
//       {
//          id: 8,
//          stage: "fourth",
//       },
//       {
//          id: 9,
//          stage: "fourth",
//       },
//    ],

//    isFingerActive: true,
// };

// export const growthStagesSlice = createSlice({
//    name: "growthStages",
//    initialState,
//    reducers: {
//       // В action.payload передется id блока
//       pickWheat: (state, action: PayloadAction<{ id: number }>) => {
//          const block = state.blocks.find(
//             (block) => block.id === action.payload.id
//          );

//          if (block) {
//             block.stage = "first";

//             // Как только мы срезали какую-то пшеницу, сразу скрываем палец подсказку
//             state.isFingerActive = false;
//          }
//       },
//    },
// });

// export const { pickWheat } = growthStagesSlice.actions;

// export const selectEarthBlock = (state: RootState, id: number) =>
//    state.growthStages.blocks.find((block) => block.id === id);

// export default growthStagesSlice.reducer;



// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { TGrowthStage } from "../../types/globalTypes";
// import { RootState } from "..";

// export interface IGrowthStages {
//   blocks: Array<{
//     id: number;
//     stage: TGrowthStage;
//   }>;

//   isFingerActive: boolean;
// }

// const initialState: IGrowthStages = {
//   blocks: Array.from({ length: 9 }, (_, index) => ({
//     id: index + 1,
//     stage: "first",
//   })),

//   isFingerActive: true,
// };

// export const growthStagesSlice = createSlice({
//   name: "growthStages",
//   initialState,
//   reducers: {
//     // В action.payload передается id блока
//     pickWheat: (state, action: PayloadAction<{ id: number }>) => {
//       const block = state.blocks.find(
//         (block) => block.id === action.payload.id
//       );

//       if (block) {
//         block.stage = "first";

//         // Как только мы срезали какую-то пшеницу, сразу скрываем палец подсказку
//         state.isFingerActive = false;
//       }
//     },
//     // Новый экшен для смены стадии роста
//     changeGrowthStage: (state, action: PayloadAction<{ id: number }>) => {
//       const block = state.blocks.find(
//         (block) => block.id === action.payload.id
//       );

//       if (block) {
//         switch (block.stage) {
//           case "first":
//             block.stage = "second";
//             break;
//           case "second":
//             block.stage = "third";
//             break;
//           case "third":
//             block.stage = "fourth";
//             break;
//           case "fourth":
//           default:
//             block.stage = "first";
//             break;
//         }
//       }
//     },
//   },
// });

// export const { pickWheat, changeGrowthStage } = growthStagesSlice.actions;

// export const selectEarthBlock = (state: RootState, id: number) =>
//   state.growthStages.blocks.find((block) => block.id === id);

// export default growthStagesSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TGrowthStage } from "../../types/globalTypes";
import { RootState } from "..";

type GrowthStage = "first" | "second" | "third" | "fourth";

interface IGrowthBlock {
  id: number;
  stage: GrowthStage;
}

export interface IGrowthStages {
  blocks: IGrowthBlock[];
  isFingerActive: boolean;
}

const initialState: IGrowthStages = {
  blocks: Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    stage: "first",
  })),
  isFingerActive: true,
};

export const growthStagesSlice = createSlice({
  name: "growthStages",
  initialState,
  reducers: {
    pickWheat: (state, action: PayloadAction<{ id: number }>) => {
      const block = state.blocks.find((block) => block.id === action.payload.id);
      if (block) {
        block.stage = "first";
        state.isFingerActive = false;
      }
    },
    changeGrowthStage: (state) => {
      state.blocks.forEach((block) => {
        if (block.stage !== "fourth") {
          switch (block.stage) {
            case "first":
              block.stage = "second";
              break;
            case "second":
              block.stage = "third";
              break;
            case "third":
              block.stage = "fourth";
              break;
            default:
              block.stage = "first";
          }
        }
      });
    },
  },
});

export const { pickWheat, changeGrowthStage } = growthStagesSlice.actions;

export const selectEarthBlock = (state: RootState, id: number) =>
  state.growthStages.blocks.find((block) => block.id === id);

export default growthStagesSlice.reducer;
