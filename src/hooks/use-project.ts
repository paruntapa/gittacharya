import { api } from '@/trpc/react'
import { useLocalStorage } from 'usehooks-ts'
const useProject = () => {
  const {data: projects} = api.project.getProjects.useQuery() // from db
  const [projectId, setProjectId] = useLocalStorage('gittacharya-project', '') // from local storage
  const project = projects?.find(project => project.id === projectId )
  
  return {
    projects,
    project,
    projectId,
    setProjectId
}
}

export default useProject