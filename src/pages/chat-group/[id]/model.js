import {getGroupDetails} from 'services'

export default {
  namespace: 'groupDetails',

  state: {},

  effects: {

    *getGroupDetails({payload}, {call}) {
      return yield call(getGroupDetails, payload)
    },

  },
}
