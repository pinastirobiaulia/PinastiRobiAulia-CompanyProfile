'use client'

import { useState, ChangeEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface Props {
  onSuccess?: () => void
}

const AddNotes = ({ onSuccess }: Props) => {
  const [openNoteModal, setOpenNoteModal] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSave = async () => {
    if (!title || !content) return
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Unauthorized. Please login.')

      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (image) formData.append('image', image) // hanya kalau ada file baru

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to create note')

      // reset form
      setTitle('')
      setContent('')
      setImage(null)
      setOpenNoteModal(false)

      onSuccess && onSuccess()
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={openNoteModal} onOpenChange={setOpenNoteModal}>
      <DialogTrigger asChild>
        <Button>Add Artikel</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Add New Artikel</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <Textarea rows={2} value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='w-full' />
          <Textarea rows={5} value={content} onChange={(e) => setContent(e.target.value)} placeholder='Content' className='w-full' />

          <div>
            <h6 className='text-base pb-2'>Upload Image</h6>
            <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500'>
              {image ? (
                <img src={URL.createObjectURL(image)} alt='Preview' className='h-full object-contain' />
              ) : (
                <span className='text-gray-400'>Click or drop an image here</span>
              )}
              <input type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
            </label>
          </div>
        </div>

        <DialogFooter className='pt-4'>
          <Button disabled={!title || !content || loading} onClick={handleSave}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
          <Button variant='error' onClick={() => setOpenNoteModal(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddNotes
