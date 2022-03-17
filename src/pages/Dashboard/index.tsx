import React, { useState, useEffect, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { fetchRepo } from '../../services/api'
import { useQuery } from 'react-query'

import logoImg from '../../assets/logo.svg'

import { Title, Form, Repositories, Error } from './styles'
import { useSelector } from 'react-redux'

interface Repository {
  full_name: string
  description: string
  owner: {
    login: string
    avatar_url: string
  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('')
  const [inputError, setInputError] = useState('')

  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    )

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories)
    }

    return []
  })

  //use query implemented to pull a repo if there are currently no repost after search
  const { data, error, isError, isLoading } = useQuery('repos', fetchRepo)

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    )
  }, [repositories])

  function qetStartRepo() {
    if (error) {
      setInputError('Error Searching for this Repositry')
      return
    }

    const repository = data

    try {
      setRepositories([...repositories, repository])
      setNewRepo('')
      setInputError('')
    } catch (err) {
      setInputError('Error Searching for this Repositry')
    }
  }

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()

    if (repositories.length === 0) {
      qetStartRepo()
    }

    if (!newRepo) {
      setInputError('Enter the Author or Repositry Name')
      return
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`)

      const repository = response.data

      setRepositories([...repositories, repository])
      setNewRepo('')
      setInputError('')
    } catch (err) {
      setInputError('Error Searching for this Repositry')
    }
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <img src={logoImg} alt="Github Explorer" />
        <button>Dark/Light</button>
      </div>
      <Title>Explore Repositries on Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Enter the repositry name"
        />
        <button type="submit">Search</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  )
}

export default Dashboard
