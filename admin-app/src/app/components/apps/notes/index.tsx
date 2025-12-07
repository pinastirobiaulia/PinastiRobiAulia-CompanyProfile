'use client'

import { useEffect, useState } from 'react'
import CardBox from '@/app/components/shared/CardBox'
import NotesSidebar from '@/app/components/apps/notes/NotesSidebar'
import NoteContent from '@/app/components/apps/notes/NoteContent'
import AddNotes from './AddNotes'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Icon } from '@iconify/react'
import { usePathname } from 'next/navigation'
import { NotesType } from '@/app/dashboard/types/apps/notes'

interface colorsType {
  lineColor: string
  disp: string | any
  id: number
}

const NotesApp = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notes, setNotes] = useState<NotesType[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const location = usePathname()

  const handleClose = () => setIsOpen(false)

  // ==================== FETCH ALL NOTES ====================
  const fetchNotes = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`)
      const data = await res.json()
      setNotes(data.articles || [])

      // Auto select first note if none selected
      if (!selectedNoteId && (data.articles?.length || 0) > 0) {
        setSelectedNoteId(data.articles[0]._id)
      }
    } catch (err) {
      console.error('Failed to fetch articles:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [location])

  // ==================== FETCH NOTE BY ID ====================
  const fetchById = async (id: string) => {
    console.log('clicked id:', id) 
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`)
      const data = await res.json()

      // Update list note agar data terbaru masuk
      setNotes(prev =>
        prev.map(note => (note._id === id ? { ...note, ...data } : note))
      )

      // Pakai ID yang diklik langsung
      setSelectedNoteId(id)
      console.log('selectedNoteId:', id) // <<-- log ID yang dipilih
      console.log('note found:', notes.find(n => n._id === id)) 
    } catch (err) {
      console.error('Failed to fetch article by id:', err)
    }
  }

  // ==================== ADD NOTE ====================
  const addNote = async (note: { title: string; color: string; content?: string }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      })

      const data = await res.json()
      setNotes(prev => [...prev, data])
      setSelectedNoteId(data._id)
    } catch (err) {
      console.error('Failed to add article:', err)
    }
  }

  // ==================== UPDATE NOTE ====================
  const updateNote = async (id: string, title: string, color: string, content?: string) => {
    try {
      // Optimistic UI update
      setNotes(prev =>
        prev.map(note =>
          note._id === id ? { ...note, title, color, content } : note
        )
      )

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, color, content }),
      })
    } catch (err) {
      console.error('Failed to update article:', err)
    }
  }

  // ==================== DELETE NOTE ====================
  const deleteNote = async (id: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`, {
        method: 'DELETE',
      })

      setNotes(prev => prev.filter(note => note._id !== id))
      if (selectedNoteId === id) {
        setSelectedNoteId(null)
      }
    } catch (err) {
      console.error('Failed to delete article:', err)
    }
  }

  return (
    <CardBox className='p-0 overflow-hidden bg-background'>
      <div className='flex'>
        {/* Sidebar */}
        <div>
          <Sheet open={isOpen} onOpenChange={handleClose}>
            <SheetContent
              side='left'
              className='max-w-[320px] sm:max-w-[320px] w-full h-full lg:z-0 lg:hidden block'>
              <NotesSidebar
                notes={notes}
                loading={loading}
                onSelectNote={fetchById}
                onDeleteNote={deleteNote}
              />
            </SheetContent>
          </Sheet>

          <div className='max-w-[320px] h-auto lg:block hidden'>
            <NotesSidebar
              notes={notes}
              loading={loading}
              onSelectNote={fetchById}
              onDeleteNote={deleteNote}
            />
          </div>
        </div>

        {/* Content */}
        <div className='w-full'>
          <div className='flex justify-between items-center border-b border-ld py-4 px-6'>
            <div className='flex gap-3 items-center'>
              <Button
                color={'lightprimary'}
                onClick={() => setIsOpen(true)}
                className='btn-circle p-0 lg:!hidden flex'>
                <Icon icon='tabler:menu-2' height={18} />
              </Button>
              <h6 className='text-base'>Edit Article</h6>
            </div>

            <AddNotes
              colors={[
                { id: 1, lineColor: 'warning', disp: 'warning' },
                { id: 2, lineColor: 'primary', disp: 'primary' },
                { id: 3, lineColor: 'error', disp: 'error' },
                { id: 4, lineColor: 'success', disp: 'success' },
                { id: 5, lineColor: 'secondary', disp: 'secondary' },
              ]}
              addNote={addNote}
            />
          </div>

          <NoteContent
            note={notes.find(n => n._id === selectedNoteId) || null}
            updateNote={updateNote}
          />
        </div>
      </div>
    </CardBox>
  )
}

export default NotesApp