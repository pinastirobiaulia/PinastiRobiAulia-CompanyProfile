'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Icon } from '@iconify/react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface Article {
  _id: string
  title: string
  content: string
  createdAt?: string
}

interface NotelistProps {
  notes: Article[]
  loading: boolean
  onSelectNote: (id: string) => void
  onDeleteNote: (id: string) => void
}

const Notelist: React.FC<NotelistProps> = ({
  notes,
  loading,
  onSelectNote,
  onDeleteNote,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

  const filteredArticles = (notes || []).filter((article) =>
    (article.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token') // jika perlu auth
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || 'Failed to delete')
      }

      // Hapus dari parent state
      onDeleteNote(id)
    } catch (err: any) {
      console.error('Failed to delete article:', err)
      alert('Failed to delete article: ' + err.message)
    }
  }

  if (loading) return <p>Loading articles...</p>

  return (
    <div>
      <Input
        type='text'
        placeholder='Search Article'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full mb-4'
      />

      <h6 className='text-base mt-6'>All Articles</h6>

      <div className='flex flex-col gap-3 mt-4'>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div
              key={article._id}
              className={`cursor-pointer relative p-4 rounded-md border transition-transform duration-200
                ${activeArticleId === article._id ? 'scale-100 border-blue-500' : 'scale-95'}`}
              onClick={() => {
                setActiveArticleId(article._id)
                onSelectNote(article._id)
              }}
            >
              <h6 className='text-base font-semibold truncate'>{article.title}</h6>
              <p className='text-sm mt-2 line-clamp-3'>{article.content}</p>

              <div className='flex items-center justify-between mt-2'>
                <p className='text-xs text-gray-500'>
                  {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : ''}
                </p>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeleteTargetId(article._id)
                        setDeleteDialogOpen(true)
                      }}
                    >
                      <Icon icon='tabler:trash' height={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete</TooltipContent>
                </Tooltip>
              </div>
            </div>
          ))
        ) : (
          <Alert variant='destructive'>
            <AlertTitle>No Articles Found!</AlertTitle>
          </Alert>
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className='sm:max-w-md mx-auto mt-40 p-6 rounded-lg'>
          <h6 className='text-lg font-semibold mb-4'>Are you sure?</h6>
          <p className='mb-6 text-sm text-gray-600'>
            Do you really want to delete this article?
          </p>
          <div className='flex justify-end gap-2'>
            <Button variant='ghost' onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={() => {
                if (deleteTargetId) {
                  handleDelete(deleteTargetId)
                }
                setDeleteDialogOpen(false)
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Notelist
