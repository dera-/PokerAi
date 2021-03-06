import MachineState from './MachineState';
import {ALL_STACK_SIZE_TYPE} from '../../const/StackSizeType';
import {ALL_ACTIONS} from '../../const/ActionName';
import StackUtil from '../../util/StackUtil';

export default class MachinePreFlopState extends MachineState {
  constructor(id, handTop, handBottom, isSuited, enemyAction) {
    super(id);
    this.handTop = handTop;
    this.handBottom = handBottom;
    this.isSuited = isSuited;
    //this.stackSize = stackSize;
    //this.myAction = myAction;
    this.enemyAction = enemyAction;
  }

  static generateAllStates() {
    let states = [],
      cardPairs = [],
      id = 1;
    for (let topNum = 14; topNum >= 2; topNum--) {
      for (let bottomNum = topNum; bottomNum >= 2; bottomNum--) {
        cardPairs.push({top:topNum, bottom:bottomNum});
      }
    }
    cardPairs.forEach((pair)=>{
      //for (let stack of ALL_STACK_SIZE_TYPE) {
        //for (let myAction of ALL_ACTIONS) {
          for (let enemyAction of ALL_ACTIONS) {
            states.push(new MachinePreFlopState(id, pair.top, pair.bottom, true, enemyAction));
            states.push(new MachinePreFlopState(id + 1, pair.top, pair.bottom, false, enemyAction));
            id += 2;
          }
        //}
      //}
    });
    return states;
  }

  static getId(myHand, myStack, enemyStack, myAction, enemyAction) {
    let sortedMyHand = myHand.sort((card1, card2) => card1.number - card2.number),
      //stackSizeType = StackUtli.getStackSizeType(myStack, enemyStack),
      isSuited = sortedMyHand[0].suit === sortedMyHand[1].suit,
      searched = PRE_FLOP_STATES.filter((state) => {
      return sortedMyHand[0].number === state.handBottom && sortedMyHand[1].number === state.handTop && isSuited === state.isSuited && enemyAction === state.enemyAction; //&& myAction === state.myAction && stackSizeType === state.stackSize;
    });
    if (searched.length === 0) {
      throw new Error('状態IDが見つかりませんでした');
    }
    return searched[0].id;
  }

  static getStatesCount() {
    return PRE_FLOP_STATES.length;
  }
}

const PRE_FLOP_STATES = MachinePreFlopState.generateAllStates();
