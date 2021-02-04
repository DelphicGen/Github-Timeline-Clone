import React, { useState, useEffect } from 'react'
import Input from '../components/form/Input'
import Container from '../components/ui/Container'
import axios from 'axios'
import Contribution from '../components/Contribution'
import { dummyCommits } from '../constants/constants'
import Button from '../components/form/Button'

const Home = () => {

    const [query, setQuery] = useState('')
    const [commits, setCommits] = useState(dummyCommits)
    const [repos, setRepos] = useState([])

    const getRepos = () => {
        axios
            .get(`https://api.github.com/users/${query}/repos`)
            .then(response => {
                setRepos(response.data)
                getCommits(response.data)
            })
    }

    const getCommits = async (repos) => {
        await Promise.all(repos.map(repo => {
            return repo ? axios.get(`https://api.github.com/repos/DelphicGen/${repo.name}/commits`) : null
        }))
        .then(responses => {

            let tempCommits = {}
            responses.forEach(response => {
                response.data?.forEach(commit => {
                    const d = new Date(commit.commit.author.date);
                    const year = d.getFullYear(), month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1), date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
                    const result = `${year}-${month}-${date}`

                    const customCommit = {
                        time: commit.commit.committer.date,
                        message: commit.commit.message
                    }

                    tempCommits[result] ? tempCommits[result].push(customCommit) : tempCommits[result] = [customCommit]
                })
            })
            setCommits(tempCommits)
        })
    }

    useEffect(() => {
        // getRepos()
    }, [])

    const handleSubmit = () => {
        // getRepos()
    }

    return (
        <div>
            <Container>
                <div className="flex justify-center items-center">
                    <Input 
                        name="query" 
                        type="text" 
                        onChange={e => setQuery(e.target.value)} 
                        className="w-64 sm:w-72"
                        value={query} 
                        placeholder="Search for any username..."
                    />
                    <Button buttonText="Search" clickHandler={handleSubmit} className="ml-5" />
                </div>
                {
                    Object.keys(commits).length > 0 && <Contribution commits={commits} />
                }

            </Container>
        </div>
    )
}

export default Home
