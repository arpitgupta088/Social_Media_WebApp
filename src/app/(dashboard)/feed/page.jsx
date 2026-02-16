"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import StoryBar from "@hyprr/components/feed/StoryBar"
import PostCard from "@hyprr/components/feed/PostCard"
import { getFeedPosts } from "@hyprr/lib/feed-api"
import { RefreshCcw, Search, Users, ArrowUp } from "lucide-react"
import { ReelProvider } from "@/context/reel-context"
import ReelViewer from "@/components/reels/ReelViewer"
import UndoSnackbar from "@/components/ui/UndoSnackbar"
import { restoreMedia } from "@hyprr/lib/media-store"


// import { startLive, getLiveStatus } from "@/services/live.service"
// import LivePreview from "@/components/live/LivePreview"
// import LivePlayer from "@/components/live/LivePlayer"

export default function FeedPage() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [showNewBtn, setShowNewBtn] = useState(false)
  const [tab, setTab] = useState("foryou")
  const [showUndo, setShowUndo] = useState(false)
  const [deletedPost, setDeletedPost] = useState(null)

  const [liveOpen, setLiveOpen] = useState(false)
  const [playerOpen, setPlayerOpen] = useState(false)
  const [viewers, setViewers] = useState(0)
  const [zoom, setZoom] = useState(false)

  const observer = useRef()
  const topRef = useRef(null)

  const loadFeed = async (pageNum = 1) => {
    if (loading) return
    setLoading(true)

    const res = await getFeedPosts(pageNum)

    setPosts((prev) => {
      const ids = new Set(prev.map((p) => p.id))
      const fresh = res.posts.filter((p) => !ids.has(p.id))
      return [...prev, ...fresh]
    })

    setHasMore(res.hasMore)
    setLoading(false)
  }

  useEffect(() => {
    loadFeed(1)
  }, [])

  // Floating button logic
  useEffect(() => {
    const handleScroll = () => {
      setShowNewBtn(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Observer for last post
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  useEffect(() => {
    if (page === 1) return
    loadFeed(page)
  }, [page])

  useEffect(() => {
    window.__REELS__ = posts.filter(
      p => p.isReel || p.mediaType === "video"
    )
  }, [posts])


  useEffect(() => {
    const handler = (e) => {
      const id = e.detail
      setPosts(prev => prev.filter(p => p.id !== id))
    }

    window.addEventListener("hyprr:delete-post", handler)
    return () => window.removeEventListener("hyprr:delete-post", handler)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      setDeletedPost(e.detail)
      setShowUndo(true)

      setTimeout(() => {
        setShowUndo(false)
        setDeletedPost(null)
      }, 5000)
    }

    window.addEventListener("hyprr:snackbar", handler)
    return () => window.removeEventListener("hyprr:snackbar", handler)
  }, [])


  return (
    <ReelProvider>
      <div className="pb-16 relative">
        <div ref={topRef} />

        {/* Tabs */}
        <div className="flex gap-2 px-3 mb-3">
          {["foryou", "following"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`
              px-4 py-1.5
              rounded-full
              text-sm font-semibold
              transition
              ${tab === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/70"
                }
            `}
            >
              {t === "foryou" ? "For You" : "Following"}
            </button>
          ))}
        </div>

        <StoryBar />

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center px-6 py-20 gap-6">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <Users className="h-10 w-10 text-muted-foreground" />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold">
                Your feed is empty
              </h2>
              <p className="text-sm text-muted-foreground">
                Follow creators or explore content to start seeing posts here.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setPosts([])
                  setPage(1)
                  loadFeed(1)
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-primary text-primary-foreground hover:opacity-90 transition"
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </button>

              <a
                href="/search"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border hover:bg-muted transition"
              >
                <Search className="h-4 w-4" />
                Explore
              </a>
            </div>
          </div>
        )}

        {/* FEED */}
        <div>
          {posts.map((post, index) => {
            if (index === posts.length - 1) {
              return (
                <div ref={lastPostRef} key={post.id}>
                  <PostCard post={post} />
                </div>
              )
            }

            return <PostCard key={post.id} post={post} />
          })}
        </div>

        {/* Skeleton Loader */}
        {loading && (
          <div className="px-4 py-6 space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="h-[460px] rounded-xl bg-muted animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Floating Button */}
        {showNewBtn && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-24 right-4 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg text-sm font-semibold transition-all hover:scale-105 active:scale-95 z-50"
          >
            <ArrowUp className="h-4 w-4" />
            New posts
          </button>
        )}

        {/* Floating Go Live
      <button
        onClick={() => {
          startLive()
          const status = getLiveStatus()
          setViewers(status.viewers)
          setZoom(true)

          setTimeout(() => {
            setZoom(false)
            setLiveOpen(true)
          }, 250)
        }}
        className={`
     fixed
       bottom-12
      right-4
      z-40
      h-14
      w-14
      rounded-full
      bg-gradient-to-r
      from-red-600
      to-red-500
      text-white
      shadow-lg
      flex
      items-center
      justify-center
      transition-all
      duration-200
      hover:scale-110
      active:scale-95
      ${zoom ? "scale-150 opacity-0" : ""}
     `}
      >
        🔴
      </button>

      {liveOpen && (
        <LivePreview
          viewers={viewers}
          onJoin={() => {
            setLiveOpen(false)
            setPlayerOpen(true)
          }}
          onClose={() => setLiveOpen(false)}
        />
      )}

      {playerOpen && (
        <LivePlayer
          onExit={() => setPlayerOpen(false)}
        />
      )} */}

        {/* Undo Snackbar */}
        <UndoSnackbar
          open={showUndo}
          onUndo={() => {
            if (!deletedPost) return

            restoreMedia(deletedPost)

            window.dispatchEvent(
              new CustomEvent("hyprr:restore-post", {
                detail: deletedPost
              })
            )

            setShowUndo(false)
            setDeletedPost(null)
          }}
        />

        <ReelViewer />
      </div>
    </ReelProvider>
  )
}
