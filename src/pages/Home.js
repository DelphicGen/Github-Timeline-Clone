import React, { useState, useEffect } from 'react'
import Input from '../components/form/Input'
import Container from '../components/ui/Container'
import axios from 'axios'
import Contribution from '../components/Contribution'

const Home = () => {

    const [query, setQuery] = useState('')
    const [commits, setCommits] = useState({})
    const [repos, setRepos] = useState([])

    useEffect(() => {

        axios
            .get('https://api.github.com/users/DelphicGen/repos')
            .then(response => {
                setRepos(response.data)
            })

    }, [])

    useEffect(() => {
        const tempCommits = {}
        // repos.forEach(repo => {
            // repos.length > 0 && axios
            //     .get(`https://api.github.com/repos/DelphicGen/${repos[0].name}/commits`)
            //     .then(response => {
            //         response.data.forEach(commit => {
            //             const d = new Date(commit.commit.author.date);
            //             const year = d.getFullYear(), month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1), date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
            //             const result = `${year}-${month}-${date}`

            //             tempCommits[result] ? tempCommits[result].push(commit) : tempCommits[result] = [commit]
            //         })
            //         console.log(tempCommits)
            //         setCommits(tempCommits);
            //     })
        // })

    }, [repos])

    return (
        <div>
            <Container>
                <Input 
                    name="query" 
                    type="text" 
                    onChange={e => setQuery(e.target.value)} 
                    className="w-80 mx-auto"
                    value={query} 
                    placeholder="Search for any username..."
                />
                <Contribution />

            </Container>
        </div>
    )
}

export default Home
