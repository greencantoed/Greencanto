'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

type Comment = {
  id: string
  author: string
  content: string
  date: string
}

type Post = {
  id: string
  title: string
  content: string
  date: string
  comments: Comment[]
}

const initialPosts: Post[] = [
  {
    id: '1',
    title: 'Aggiornamento Progetto Siracusa',
    content: 'Abbiamo completato la prima fase di installazione dei pannelli solari...',
    date: '2023-06-15',
    comments: [
      { id: '1', author: 'Mario', content: 'Ottimo lavoro!', date: '2023-06-16' },
    ]
  },
]

export function SrcComponentsCommunityBlog() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newComment, setNewComment] = useState('')

  const addComment = (postId: string) => {
    if (newComment.trim() === '') return

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now().toString(),
              author: 'Utente',
              content: newComment,
              date: new Date().toISOString().split('T')[0]
            }
          ]
        }
      }
      return post
    }))

    setNewComment('')
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Blog della Comunità</h2>
      {posts.map(post => (
        <div key={post.id} className="mb-8 bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <p className="text-gray-600 mb-2">{post.date}</p>
          <p className="mb-4">{post.content}</p>
          <h4 className="font-bold mb-2">Commenti:</h4>
          {post.comments.map(comment => (
            <div key={comment.id} className="mb-2 bg-gray-100 p-2 rounded">
              <p className="font-bold">{comment.author}</p>
              <p>{comment.content}</p>
              <p className="text-sm text-gray-600">{comment.date}</p>
            </div>
          ))}
          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Aggiungi un commento..."
            />
            <Button onClick={() => addComment(post.id)}>Invia Commento</Button>
          </div>
        </div>
      ))}
    </div>
  )
}