'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'

interface Article {
  _id: string
  title: string
  content: string
  image?: string | null
  imageUrl?: string | null
  createdAt?: string
  updatedAt?: string
}

interface Props {
  note: Article | null
  updateNote: (
    id: string,
    title: string,
    content: string,
    imageUrl?: string
  ) => void
}

const NoteContent: React.FC<Props> = ({ note, updateNote }) => {
  const [article, setArticle] = useState<Article | null>(null)
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (!note) return

    setArticle({ ...note })

    const url =
      note.imageUrl ||
      (note.image
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/uploads/${note.image}`
        : null)
    setPreview(url)
    setImageFile(null)
  }, [note])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSave = async () => {
    if (!article) return

    try {
      setSaving(true)

      const formData = new FormData()
      formData.append('title', article.title || '')
      formData.append('content', article.content || '')

      // Upload file baru jika ada
      if (imageFile) {
        formData.append('image', imageFile)
      }
      // Kirim existingImage hanya kalau ada dan belum diganti file baru
      else if (article.image) {
        formData.append('existingImage', article.image)
      }

      const token = localStorage.getItem('token')
      if (!token) {
        alert('Kamu belum login. Silakan login kembali.')
        return
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/${article._id}`,
        {
          method: 'PUT',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(errText || 'Failed to update article')
      }

      const data = await res.json()
      const updatedArticle = data.article

      const updatedImageUrl = updatedArticle.image
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/uploads/${updatedArticle.image}`
        : null

      // Update state di parent dan lokal
      updateNote(
        article._id,
        updatedArticle.title,
        updatedArticle.content,
        updatedImageUrl || undefined
      )
      setArticle((prev) =>
        prev
          ? {
            ...prev,
            title: updatedArticle.title,
            content: updatedArticle.content,
            image: updatedArticle.image,
            imageUrl: updatedImageUrl,
          }
          : prev
      )
      setPreview(updatedImageUrl || null)
      setImageFile(null)

      console.log('Article saved successfully!')
    } catch (err: any) {
      console.error('Exception when saving article:', err)
      if (err instanceof Error) {
        console.error('Error name:', err.name)
        console.error('Error message:', err.message)
        console.error('Error stack:', err.stack)
      }
      alert('Terjadi kesalahan saat menyimpan artikel: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (!note || !article) {
    return <div className="p-10 text-center text-gray-500">Pilih artikel dulu</div>
  }

  return (
    <div className="p-6 space-y-4">
      <Input
        placeholder="Title"
        value={article.title || ''}
        onChange={(e) =>
          setArticle((prev) => (prev ? { ...prev, title: e.target.value } : null))
        }
      />

      <Textarea
        placeholder="Write your content..."
        rows={12}
        value={article.content || ''}
        onChange={(e) =>
          setArticle((prev) => (prev ? { ...prev, content: e.target.value } : null))
        }
      />

      <div>
        <label className="block text-sm font-medium mb-2">Image</label>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-64 h-48 object-cover rounded mb-3 border"
            onError={() => {
              console.warn(`[WARN] Preview image ${preview} gagal dimuat, diabaikan`)
              setPreview(null)
              setArticle((prev) => (prev ? { ...prev, image: null } : prev))
            }}
          />
        )}

        <Input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Icon icon="tabler:loader-2" className="animate-spin mr-2" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </div>
  )
}

export default NoteContent
