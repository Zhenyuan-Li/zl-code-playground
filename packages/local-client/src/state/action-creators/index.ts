import { Dispatch } from 'redux';
import axios from 'axios';

import { ActionType } from '../action-types/index';
import {
  UpdateCellACtion,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Direction,
  Action,
} from '../actions';
import { Cell, CellTypes } from '../cell';
import bundle from '../../bundler';
import { RootState } from '../reducers';

export const updateCell = (id: string, content: string): UpdateCellACtion => ({
  type: ActionType.UPDATE_CELL,
  payload: {
    id,
    content,
  },
});

export const deleteCell = (id: string): DeleteCellAction => ({
  type: ActionType.DELETE_CELL,
  payload: id,
});

export const moveCell = (id: string, direction: Direction): MoveCellAction => ({
  type: ActionType.MOVE_CELL,
  payload: {
    id,
    direction,
  },
});

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => ({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id,
    type: cellType,
  },
});

export const createBundle =
  (cellId: string, input: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {
          code: result.code,
          err: result.error,
        },
      },
    });
  };

export const fetchCells = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.FETCH_CELLS });

  try {
    const { data }: { data: Cell[] } = await axios.get('/cells');
    dispatch({ type: ActionType.FETCH_CELL_COMPLETE, payload: data });
  } catch (error) {
    dispatch({ type: ActionType.FETCH_CELL_ERROR, payload: error.message });
  }
};

export const saveCells =
  () => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();

    const cells = order.map((id) => data[id]);
    try {
      await axios.post('/cells', { cells });
    } catch (error) {
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: error.message,
      });
    }
  };
