import './tailwind.css'
import Home from './pages/Home'


function App() {
  return (
    <div className="bg-blue-900 min-h-screen">
      <Home />
    </div>
  );
}

export default App;


// https://api.github.com/search/commits?q={query}{&page,per_page,sort,order}
// "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}"
// "https://api.github.com/repos/DelphicGen/Class_Diagram/commits{/sha}"



    // useEffect(() => {
    //     const tempCommits = []
    //     repos.forEach(repo => {
    //         axios
    //             .get(`https://api.github.com/repos/DelphicGen/${repo.name}/commits`)
    //             .then(response => {
    //                 console.log(response)
    //             })
    //     })

    // }, [repos])



        // axios
        //     .get('https://api.github.com/users/DelphicGen/repos')
        //     .then(response => {
        //         setRepos(response.data)
        //     })

      //   useEffect(() => {
      //     const d = new Date();
      //     const year = d.getFullYear(), month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1), date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
  
      //     axios
              // .get(`https://api.github.com/users/DelphicGen/events?since=${year - 2}-${month}-${date}&until=${year}-${month}-${date}&per_page=100&page`)
              // .then(response => {
              //     console.log(response)
              //     // let pushEvents = response.data.filter(e => e.type === 'PushEvent')
              //     // setCommits(pushEvents)
              // })
  
      // }, [])


      // const d = new Date();
      // const year = d.getFullYear(), month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1), date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()