"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Phone, MapPin, Clock, Star, MoreVertical } from "lucide-react"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  type: "text" | "location" | "system"
}

interface ChatSystemProps {
  rideId: string
  otherUser: {
    id: string
    name: string
    avatar?: string
    rating: number
    isDriver: boolean
  }
}

export function ChatSystem({ rideId, otherUser }: ChatSystemProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mock initial messages
    const initialMessages: Message[] = [
      {
        id: "1",
        senderId: "system",
        senderName: "System",
        content: "Ride confirmed! You can now chat with your co-passenger.",
        timestamp: new Date(Date.now() - 300000),
        type: "system",
      },
      {
        id: "2",
        senderId: otherUser.id,
        senderName: otherUser.name,
        content: "Hi! I'll be there in 5 minutes. I'm driving a white sedan.",
        timestamp: new Date(Date.now() - 240000),
        type: "text",
      },
      {
        id: "3",
        senderId: "current-user",
        senderName: "You",
        content: "Perfect! I'll be waiting near the main gate.",
        timestamp: new Date(Date.now() - 180000),
        type: "text",
      },
    ]
    setMessages(initialMessages)

    // Simulate typing indicator
    const typingInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsTyping(true)
        setTimeout(() => setIsTyping(false), 2000)
      }
    }, 10000)

    return () => clearInterval(typingInterval)
  }, [otherUser.id, otherUser.name])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      senderName: "You",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate response
    setTimeout(
      () => {
        const responses = [
          "Thanks for the update!",
          "Sounds good!",
          "I'll be there shortly.",
          "Perfect, see you soon!",
          "Got it, thanks!",
        ]

        const response: Message = {
          id: (Date.now() + 1).toString(),
          senderId: otherUser.id,
          senderName: otherUser.name,
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          type: "text",
        }

        setMessages((prev) => [...prev, response])
      },
      1000 + Math.random() * 2000,
    )
  }

  const shareLocation = () => {
    const locationMessage: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      senderName: "You",
      content: "Shared live location",
      timestamp: new Date(),
      type: "location",
    }
    setMessages((prev) => [...prev, locationMessage])
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={otherUser.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {otherUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{otherUser.name}</CardTitle>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs ml-1">{otherUser.rating}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {otherUser.isDriver ? "Driver" : "Passenger"}
                </Badge>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="outline">
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === "system" ? (
                <div className="text-center">
                  <Badge variant="secondary" className="text-xs">
                    {message.content}
                  </Badge>
                </div>
              ) : (
                <div className={`flex ${message.senderId === "current-user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] ${message.senderId === "current-user" ? "order-2" : "order-1"}`}>
                    <div
                      className={`rounded-lg p-3 ${
                        message.senderId === "current-user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                      }`}
                    >
                      {message.type === "location" ? (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{message.content}</span>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                    </div>
                    <p
                      className={`text-xs text-muted-foreground mt-1 ${
                        message.senderId === "current-user" ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3 max-w-[70%]">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={shareLocation} className="flex-shrink-0 bg-transparent">
              <MapPin className="w-4 h-4" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} size="sm" disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>ETA: 15 mins</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>2.5 km away</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
