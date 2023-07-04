import {} from '@mdi/js'
import { ref, watch } from '@vue/composition-api'

import axios from '@axios'
import constData from '@/const'

export default function projectsList() {
  const projectsListTable = ref([])

  const tableColumns = [
    { text: 'VPM画像', value: 'picture' },
    { text: 'プロジェクト名', value: 'name' },
    { text: '詳細', value: 'actions', align: 'center', sortable: false },
  ]

  const searchQuery = ref('')
  const totalListTable = ref(0)
  const loading = ref(false)
  const options = ref({
    sortBy: ['id'],
    sortDesc: [true],
  })

  // fetch data
  const fetchProjects = () => {
    const { PRODUCT_API_URL, DEV_API_URL } = constData()
    const url = PRODUCT_API_URL
    axios.get(`${url}/dash-info`)
      .then(response => {
        const { page = 0, itemsPerPage = 0 } = options.value
        const queryLowered = searchQuery.value.toLowerCase()

        const resultData = response.data.filter(
          user =>
            /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
            (user.name.toLowerCase().includes(queryLowered) || user.vpm_name.toLowerCase().includes(queryLowered)),
        )
        const filteredData = itemsPerPage !== -1 ? resultData.slice((page - 1) * itemsPerPage, page * itemsPerPage) : resultData

        projectsListTable.value = filteredData
        totalListTable.value = response.data.length
        loading.value = false
      })
      .catch(error => {
        console.log(error)
      })
  }

  watch([searchQuery, options], () => {
    loading.value = true
    fetchProjects()
  })

  return {
    projectsListTable,
    tableColumns,
    searchQuery,
    totalListTable,
    loading,
    options,
    fetchProjects,
  }
}
