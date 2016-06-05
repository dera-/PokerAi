import QValue from '../../model/learn/QValue';
import MachineAction from '../../model/learn/MachineAction';
import MachineOpenedBoardState from '../../model/learn/MachineOpenedBoardState';
import MachinePreFlopState from '../../model/learn/MachinePreFlopState';

export default class QvalueFactory {
  generateMapForPreFlopState() {
    return this.generateMap(MachinePreFlopState.getStatesCount(), MachineAction.getActionsCount());
  }

  generateMapForOpenedBoardState() {
    return this.generateMap(MachineOpenedBoardState.getStatesCount(), MachineAction.getActionsCount());
  }

  generateMap(statesCount, actionsCount) {
    let qValueMap = new Map();
    for (let stateId = 1; stateId <= statesCount; stateId++) {
      let qValues = [];
      for (let actionId = 1; actionId <= actionsCount; actionId++) {
        qValues.push(new QValue(stateId, actionId));
      }
      qValueMap.set(stateId, qValues);
    }
    return qValueMap;
  }
}
