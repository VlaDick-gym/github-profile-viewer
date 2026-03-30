import { useState } from 'react'

interface UserProfile {
  login: string
  name: string
  bio: string
  avatar_url: string
  public_repos: number
  followers: number
  following: number
  location: string
  blog: string
  html_url: string
  created_at: string
}

interface Repository {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
}

function App() {
  const [username, setUsername] = useState('')
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const demoProfiles: Record<string, { profile: UserProfile; repos: Repository[] }> = {
    'vladick-gym': {
      profile: {
        login: 'VlaDick-gym',
        name: 'Зубаль Даниил',
        bio: 'Frontend/Fullstack разработчик. Люблю создавать красивые и функциональные веб-приложения.',
        avatar_url: 'https://avatars.githubusercontent.com/u/123456789?v=4',
        public_repos: 15,
        followers: 42,
        following: 28,
        location: 'Минск, Беларусь',
        blog: 'https://daniil-portfolio.vercel.app',
        html_url: 'https://github.com/VlaDick-gym',
        created_at: '2023-01-15T10:00:00Z'
      },
      repos: [
        { id: 1, name: 'todo-app', description: 'Приложение для управления задачами', language: 'TypeScript', stargazers_count: 12, forks_count: 3, html_url: '#' },
        { id: 2, name: 'weather-app', description: 'Прогноз погоды с OpenWeatherMap API', language: 'React', stargazers_count: 8, forks_count: 2, html_url: '#' },
        { id: 3, name: 'portfolio', description: 'Персональное портфолио', language: 'Next.js', stargazers_count: 25, forks_count: 5, html_url: '#' },
      ]
    },
    'facebook': {
      profile: {
        login: 'facebook',
        name: 'Facebook',
        bio: 'Making the world more open and connected.',
        avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
        public_repos: 120,
        followers: 15000,
        following: 0,
        location: 'Menlo Park, CA',
        blog: 'https://engineering.fb.com',
        html_url: 'https://github.com/facebook',
        created_at: '2009-05-11T19:13:22Z'
      },
      repos: [
        { id: 1, name: 'react', description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.', language: 'JavaScript', stargazers_count: 210000, forks_count: 42000, html_url: '#' },
        { id: 2, name: 'react-native', description: 'A framework for building native apps using React', language: 'JavaScript', stargazers_count: 110000, forks_count: 23000, html_url: '#' },
        { id: 3, name: 'next.js', description: 'The React Framework', language: 'JavaScript', stargazers_count: 95000, forks_count: 18000, html_url: '#' },
      ]
    }
  }

  const searchProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    setLoading(true)
    setError('')

    await new Promise(resolve => setTimeout(resolve, 800))

    const userLower = username.toLowerCase().trim()
    const demoData = demoProfiles[userLower]

    if (demoData) {
      setProfile(demoData.profile)
      setRepos(demoData.repos)
    } else {
      // Генерируем случайный профиль для других пользователей
      const randomProfile: UserProfile = {
        login: username,
        name: username.charAt(0).toUpperCase() + username.slice(1),
        bio: 'Разработчик | Open Source энтузиаст | Люблю создавать крутые проекты',
        avatar_url: `https://ui-avatars.com/api/?name=${username}&size=200&background=667eea&color=fff`,
        public_repos: Math.floor(Math.random() * 50) + 5,
        followers: Math.floor(Math.random() * 500) + 10,
        following: Math.floor(Math.random() * 200) + 5,
        location: ['Москва', 'Минск', 'Санкт-Петербург', 'Киев'][Math.floor(Math.random() * 4)],
        blog: 'https://example.com',
        html_url: `https://github.com/${username}`,
        created_at: '2020-01-01T00:00:00Z'
      }

      const randomRepos: Repository[] = [
        { id: 1, name: `${username}-project-1`, description: 'Интересный проект на React', language: 'TypeScript', stargazers_count: Math.floor(Math.random() * 100), forks_count: Math.floor(Math.random() * 20), html_url: '#' },
        { id: 2, name: `${username}-project-2`, description: 'Библиотека для работы с API', language: 'JavaScript', stargazers_count: Math.floor(Math.random() * 100), forks_count: Math.floor(Math.random() * 20), html_url: '#' },
        { id: 3, name: `${username}-portfolio`, description: 'Персональное портфолио', language: 'Next.js', stargazers_count: Math.floor(Math.random() * 100), forks_count: Math.floor(Math.random() * 20), html_url: '#' },
      ]

      setProfile(randomProfile)
      setRepos(randomRepos)
    }

    setLoading(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long'
    })
  }

  return (
    <div className="app">
      <div className="container">
        <h1>💼 GitHub Profile Viewer</h1>

        <form onSubmit={searchProfile} className="search-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите GitHub username..."
            className="username-input"
          />
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? '⏳' : '🔍'}
          </button>
        </form>

        <div className="quick-search">
          <span>Попробовать:</span>
          <button onClick={() => { setUsername('VlaDick-gym'); searchProfile({ preventDefault: () => {} } as any) }}>VlaDick-gym</button>
          <button onClick={() => { setUsername('facebook'); searchProfile({ preventDefault: () => {} } as any) }}>facebook</button>
        </div>

        {error && <div className="error">{error}</div>}

        {profile && (
          <div className="profile-container">
            <div className="profile-card">
              <img src={profile.avatar_url} alt={profile.login} className="avatar" />
              <div className="profile-info">
                <h2>{profile.name || profile.login}</h2>
                <p className="username">@{profile.login}</p>
                {profile.bio && <p className="bio">{profile.bio}</p>}
                
                <div className="stats">
                  <div className="stat">
                    <span className="stat-value">{profile.public_repos}</span>
                    <span className="stat-label">Репозиториев</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{profile.followers}</span>
                    <span className="stat-label">Подписчиков</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{profile.following}</span>
                    <span className="stat-label">Подписок</span>
                  </div>
                </div>

                <div className="details">
                  {profile.location && (
                    <div className="detail">
                      <span>📍</span> {profile.location}
                    </div>
                  )}
                  {profile.blog && (
                    <div className="detail">
                      <span>🔗</span> <a href={profile.blog} target="_blank" rel="noopener noreferrer">{profile.blog}</a>
                    </div>
                  )}
                  <div className="detail">
                    <span>📅</span> На GitHub с {formatDate(profile.created_at)}
                  </div>
                </div>

                <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="github-btn">
                  Перейти на GitHub
                </a>
              </div>
            </div>

            <div className="repos-section">
              <h3>📦 Популярные репозитории</h3>
              <div className="repos-grid">
                {repos.map(repo => (
                  <div key={repo.id} className="repo-card">
                    <div className="repo-header">
                      <span className="repo-name">{repo.name}</span>
                      {repo.language && (
                        <span className="language-badge">{repo.language}</span>
                      )}
                    </div>
                    <p className="repo-description">{repo.description || 'Описание отсутствует'}</p>
                    <div className="repo-stats">
                      <span>⭐ {repo.stargazers_count}</span>
                      <span>🍴 {repo.forks_count}</span>
                    </div>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-link">
                      Смотреть на GitHub →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!profile && !loading && (
          <div className="empty-state">
            <p>Введите GitHub username для просмотра профиля</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
