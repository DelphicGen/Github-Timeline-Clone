import React, { useState, useEffect } from 'react'
import Input from '../components/form/Input'
import Container from '../components/ui/Container'
import axios from 'axios'
import Contribution from '../components/Contribution'
import { dummyCommits } from '../constants/constants'

const Home = () => {

    const [query, setQuery] = useState('')
    const [commits, setCommits] = useState(dummyCommits)
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

    //                     const customCommit = {
    //                         time: commit.commit.committer.date,
    //                         message: commit.commit.message
    //                     }

    //                     tempCommits[result] ? tempCommits[result].push(customCommit) : tempCommits[result] = [customCommit]
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
                {
                    Object.keys(commits).length > 0 && <Contribution commits={commits} />
                }

            </Container>
        </div>
    )
}

export default Home
