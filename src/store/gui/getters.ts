import {caseInsensitiveSort} from '@/plugins/helpers'
import {GetterTree} from 'vuex'
import {GuiState, GuiStateConsoleFilter, GuiStateMacrogroup} from '@/store/gui/types'
import {timelapseConsoleFilters} from '@/store/variables'
import {GuiState, GuiStateMacrogroup} from '@/store/gui/types'

// eslint-disable-next-line
export const getters: GetterTree<GuiState, any> = {

    getDatasetValue: (state) => (payload: { name: string, type: string }) => {
        if (
            payload.name in state.tempchart.datasetSettings &&
			payload.type in state.tempchart.datasetSettings[payload.name]
        ) return state.tempchart.datasetSettings[payload.name][payload.type]

        return ['temperature', 'target'].includes(payload.type)
    },

    getDatasetAdditionalSensorValue: (state) => (payload: { name: string, sensor: string }) => {
        if (
            payload.name in state.tempchart.datasetSettings &&
			'additionalSensors' in state.tempchart.datasetSettings[payload.name] &&
			payload.sensor in state.tempchart.datasetSettings[payload.name].additionalSensors
        ) return state.tempchart.datasetSettings[payload.name].additionalSensors[payload.sensor]

        return true
    },

    getPanelExpand: (state) => (name: string) => {
        return !state.dashboard.nonExpandPanels?.includes(name) ?? true
    },

    getAllMacroGroups: (state) => {
        return caseInsensitiveSort(state.dashboard.macrogroups ?? [], 'name')
    },

    getMacroGroup: (state) => (id: string) => {
        return state.dashboard.macrogroups.find((group: GuiStateMacrogroup) => group.id === id)
    },

    getPanels: (state, getters) => (viewport: string) => {
        let panels = state.dashboard[viewport]?.filter((element: any) => element !== null) ?? []

        if (state.dashboard.macroManagement === 'simple') panels = panels.filter((element: any) => !element.name.startsWith('macrogroup_'))
        else {
            panels = panels.filter((element: any) => element.name !== 'macros')
            const macrogroups = getters['getAllMacroGroups']
            if (macrogroups.length) {
                panels = panels.filter((element: any) => {
                    if (!element.name.startsWith('macrogroup_')) return true

                    const macrogroupId = element.name.substr(11)
                    return (macrogroups.findIndex((macrogroup: GuiStateMacrogroup) => macrogroup.id === macrogroupId) !== -1)
                })
            }
        }

        if (getters['webcams/getWebcams'].length === 0) {
            panels = panels.filter((element: any) => element.name !== 'webcam')
        }

        return panels
    }
}
