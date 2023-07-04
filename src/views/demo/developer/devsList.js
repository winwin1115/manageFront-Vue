import {} from '@mdi/js'
import { ref, watch } from '@vue/composition-api'

import axios from '@axios'
import constData from '@/const'

export default function devsList() {
  const devListTable = ref([])

  const tableColumns = [
    { text: '開発者画像', value: 'picture' },
    { text: 'ふりがな', value: 'ruby' },
    { text: 'ドメイン知識', value: 'domain_knowledge' },
    { text: 'スキルスコア', value: 'skill_score' },
    { text: '詳細', value: 'actions', align: 'center', sortable: false },
  ]

  const searchQuery = ref('')
  const totalListTable = ref(0)
  const loading = ref(false)
  const options = ref({
    sortBy: ['id'],
    sortDesc: [true],
  })
  const userTotalLocal = ref([])
  const selectedRows = ref([])

  // fetch data
  const fetchDevs = () => {
    const { PRODUCT_API_URL, DEV_API_URL } = constData()
    const url = PRODUCT_API_URL
    axios.get(`${url}/dev-info`)
      .then(response => {
        const { page = 0, itemsPerPage = 0 } = options.value
        const queryLowered = searchQuery.value.toLowerCase()

        const resultData = response.data.filter(
          user =>
            /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
            (user.name.toLowerCase().includes(queryLowered) || user.ruby.toLowerCase().includes(queryLowered) || user.domain_knowledge.toLowerCase().includes(queryLowered)),
        )
        const filteredData = itemsPerPage !== -1 ? resultData.slice((page - 1) * itemsPerPage, page * itemsPerPage) : resultData

        devListTable.value = filteredData
        totalListTable.value = response.data.length
        loading.value = false
      })
      .catch(error => {
        console.log(error)
      })
  }

  watch([searchQuery, options], () => {
    loading.value = true
    selectedRows.value = []
    fetchDevs()
  })

  return {
    devListTable,
    tableColumns,
    searchQuery,
    totalListTable,
    loading,
    options,
    userTotalLocal,
    fetchDevs,
  }
}
