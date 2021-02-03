import React, { useState, useEffect } from 'react'
import Input from '../components/form/Input'
import Container from '../components/ui/Container'
import axios from 'axios'
import Contribution from '../components/Contribution'

const Home = () => {

    const [query, setQuery] = useState('')
    const [commits, setCommits] = useState(
        {
            ['2020-05-10']: ['{…}'],
            ['2020-05-11']: ['{…}'],
            ['2020-06-01']:  ['{as…}', '{…}'],
            ['2020-06-02']:  ['{…}', '{…}', '{…}', '{…}', '{…}', '{…}'],
            ['2020-06-03']: ['{…}'],
            ['2020-06-04']:  ['{…}', '{…}', '{…}'],
            ['2020-06-05']: ['{…}'],
            ['2020-06-06']:  ['{…}', '{…}', '{…}', '{…}'],
            ['2020-06-08']:  ['{…}', '{…}', '{…}', '{…}'],
            ['2020-06-09']:  ['{…}', '{…}', '{…}'],
            ['2020-06-26']:  ['{…}', '{…}', '{…}', '{…}', '{…}'],
            ['2020-07-05']: ['{…}'],
            ['2020-07-07']:  ['{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}'],
            ['2020-07-08']:  ['{…}', '{…}', '{…}', '{…}', '{…}'],
            ['2020-07-11']:  ['{…}', '{…}', '{…}'],
            ['2020-07-12']: ['{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}'],
            ['2020-08-02']:  ['{…}', '{…}', '{…}'],
            ['2020-08-03']: ['{…}'],
            ['2020-08-06']:  ['{…}', '{…}'],
            ['2020-08-07']:  ['{…}', '{…}', '{…}'],
            ['2020-08-08']:  ['{…}', '{…}', '{…}', '{…}'],
            ['2020-08-09']: ['{…}'],
            ['2020-08-10']:  ['{…}', '{…}', '{…}'],
            ['2020-08-11']: ['{…}'],
            ['2020-08-13']: ['{…}'],
            ['2020-08-15']:  ['{…}', '{…}', '{…}', '{…}'],
            ['2020-08-16']:  ['{…}', '{…}', '{…}', '{…}'],
            ['2020-08-19']:  ['{…}', '{…}', '{…}', '{…}', '{…}'],
            ['2020-08-20']: ['{…}'],
            ['2020-08-21']:  ['{…}', '{…}'],
            ['2020-08-22']:  ['{…}', '{…}', '{…}', '{…}'],
            ['2020-08-24']: ['{…}'],
            ['2020-08-26']:  ['{…}', '{…}', '{…}', '{…}', '{…}', '{…}'],
            ['2020-08-27']:  ['{…}', '{…}'],
            ['2020-08-28']: ['{…}'],
            ['2020-08-30']: ['{…}'],
            ['2020-09-02']: ['{…}'],
            ['2020-09-03']:  ['{…}', '{…}'],
            ['2020-09-05']:  ['{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}'],
            ['2020-09-07']: ['{…}'],
            ['2020-09-11']: ['{…}'],
            ['2020-09-13']:  ['{…}', '{…}'],
            ['2020-09-15']: ['{…}'],
            ['2020-09-23']:  ['{…}', '{…}', '{…}'],
            ['2020-09-24']: ['{…}'],
            ['2020-09-28']: ['{…}'],
            ['2020-10-03']: ['{…}'],
            ['2020-10-04']:  ['{…}', '{…}', '{…}', '{…}', '{…}', '{…}'],
            ['2020-10-05']: ['{…}'],
            ['2020-10-09']:  ['{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}'],
            ['2020-10-10']:  ['{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}'],
            ['2020-11-04']:  ['{…}', '{…}'],
            ['2020-11-06']:  ['{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}'],
            ['2020-11-07']:  ['{…}', '{…}', '{…}', '{…}', '{…}'],
            ['2020-11-08']: ['{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}'],
            ['2020-11-09']:  ['{…}', '{…}', '{…}', '{…}'],
            ['2020-11-13']:  ['{…}', '{…}', '{…}'],
            ['2020-11-15']:  ['{…}', '{…}', '{…}'],
            ['2020-11-17']: ['{…}'],
            ['2020-11-19']:  ['{…}', '{…}'],
            ['2020-11-24']:  ['{…}', '{…}', '{…}'],
            ['2020-11-27']:  ['{…}', '{…}'],
            ['2020-12-04']: ['{…}'],
            ['2020-12-22']:  ['{…}', '{…}'],
            ['2020-12-24']:  ['{…}', '{…}', '{…}', '{…}'],
            ['2020-12-25']:  ['{…}', '{…}', '{…}'],
            ['2020-12-26']:  ['{…}', '{…}', '{…}'],
            ['2020-12-27']:  ['{…}', '{…}'],
            ['2020-12-28']: ['{…}'],
            ['2021-01-16']: ['{…}'],
            ['2021-01-22']:  ['{…}', '{…}', '{…}', '{…}'],
            ['2021-01-24']:  ['{…}', '{…}', '{…}', '{…}', '{…}', '{…}'],
            ['2021-01-25']:  ['{…}', '{…}', '{…}'],
            ['2021-01-26']:  ['{…}', '{…}'],
            ['2021-01-28']: ['{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}', '{…}'],
            ['2021-02-02']:  ['{…}', '{…}', '{…}'],
            ['2021-02-03']: ['{…}'],
          }
    )
    const [repos, setRepos] = useState([])

    // useEffect(() => {

    //     axios
    //         .get('https://api.github.com/users/DelphicGen/repos')
    //         .then(response => {
    //             setRepos(response.data)

    //         })

    // }, [])

    // useEffect(() => {
    //     const getCommits = async() => {
    //         await Promise.all(repos.map(repo => {
    //             return repo ? axios.get(`https://api.github.com/repos/DelphicGen/${repo.name}/commits`) : null
    //         }))
    //         .then(responses => {

    //             let tempCommits = {}
    //             responses.forEach(response => {
    //                 response.data?.forEach(commit => {
    //                     const d = new Date(commit.commit.author.date);
    //                     const year = d.getFullYear(), month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1), date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
    //                     const result = `${year}-${month}-${date}`

    //                     tempCommits[result] ? tempCommits[result].push(commit) : tempCommits[result] = [commit]
    //                 })
    //             })
    //             setCommits(tempCommits)
    //         })
    //     }
    //     getCommits()
    // }, [repos])

    return (
        <div>
            <Container>
                <Input 
                    name="query" 
                    type="text" 
                    onChange={e => setQuery(e.target.value)} 
                    className="w-64 sm:w-72 mx-auto"
                    value={query} 
                    placeholder="Search for any username..."
                />
                <div className="mt-10 border border-gray-400 pl-5 pr-4 rounded-md max-w-full w-fit-content mx-auto">
                    {
                        Object.keys(commits).length > 0 && <Contribution commits={commits} />
                    }
                </div>

            </Container>
        </div>
    )
}

export default Home
