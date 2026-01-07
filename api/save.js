export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Только POST запросы' })
  }

  const { password, content } = req.body

  // Проверка пароля
  if (password !== 'admin2026') {
    return res.status(401).json({ error: 'Неверный пароль' })
  }

  try {
    const token = process.env.GITHUB_TOKEN
    const repo = 'berserkedman/crackkdev.portfolio'
    const path = 'public/data/projects.json'
    const branch = 'main'

    // Получаем SHA файла
    const getFileRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    )

    let sha = null
    if (getFileRes.ok) {
      const fileData = await getFileRes.json()
      sha = fileData.sha
    }

    // Сохраняем файл
    const contentBase64 = Buffer.from(JSON.stringify(content, null, 2)).toString('base64')
    
    const updateRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Обновление через админку',
          content: contentBase64,
          branch,
          ...(sha && { sha })
        })
      }
    )

    if (!updateRes.ok) {
      const error = await updateRes.json()
      throw new Error(error.message)
    }

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Ошибка сохранения:', error)
    res.status(500).json({ error: error.message })
  }
}
