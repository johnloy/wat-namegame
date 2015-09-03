import Advisor from 'autocrat-advisor'
import getPage from '../../../lib/get-page'
import omit from 'lodash.omit'

export default class PageAdvisor extends Advisor {

  get expertise () {
    return {

      changing: {

        change: Advisor.Action((name, routeParams) => {
          const nextPage = omit(getPage(name), 'component')
          nextPage.params = routeParams
          return nextPage
        }),

        changes: Advisor.Stream
      },

      updating: {

        updateWithRoute: Advisor.Action((data) => {
          const routeData =  data.triggeringEvents.advisor.data
          if(!routeData.current || routeData.current.name !== routeData.next.name) {
            this.actions.change(routeData.next.name, routeData.next.params)
            return true
          }
        })
      }

    }
  }

}