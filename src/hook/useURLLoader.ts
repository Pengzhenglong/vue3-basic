import { ref } from 'vue'
import axios from 'axios'

function useURLLoader(url: string) {
  const result = ref(null)
  const loading = ref(true)
  const loaded = ref(false)
  const error = ref(null)
  axios.get(url).then((success) => {
    loading.value = false;
    loaded.value = true;
    result.value = success.data
  }).catch(e => {
    error.value = e;
    loading.value = false;
  })
  return {
    result,
    loading,
    error,
    loaded
  }
}
export default useURLLoader