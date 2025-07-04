"use client"

import { useState, useMemo } from "react"
import { Group, Paper, Text, Container, TextInput, Flex } from "@mantine/core"
// import { IconSearch } from "@tabler/icons-react"
import { DraggableNode } from "./draggableNode"

const nodeData = [
  {
    type: "customInput",
    label: "Input",
    icon: "📝",
    description: "Data input",
  },
  {
    type: "llm",
    label: "OpenAI LLM",
    icon: "🤖",
    description: "AI processing",
  },
  {
    type: "customOutput",
    label: "Output",
    icon: "📤",
    description: "Result output",
  },
  {
    type: "text",
    label: "Text",
    icon: "📄",
    description: "Text content",
  },
  {
    type: "log",
    label: "Logger",
    icon: "📋",
    description: "Log messages",
  },
  {
    type: "knowledgebasereader",
    label: "Knowledge Base Reader",
    icon: "🔍",
    description: "Retrieves KB data",
  },
  {
    type: "apiCall",
    label: "API Call",
    icon: "🌐",
    description: "External API",
  },
  {
    type: "math",
    label: "Math",
    icon: "🔢",
    description: "Mathematical ops",
  },
  {
    type: "imageDisplay",
    label: "Image",
    icon: "🖼️",
    description: "Image display",
  },
]

export const PipelineToolbar = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNodes = useMemo(() => {
    if (!searchQuery.trim()) return nodeData

    const query = searchQuery.toLowerCase()
    return nodeData.filter(
      (node) =>
        node.label.toLowerCase().includes(query) ||
        node.description.toLowerCase().includes(query) ||
        node.type.toLowerCase().includes(query),
    )
  }, [searchQuery])

  return (
    <Container fluid>
      <Paper
        p="xl"
        radius="xl"
        style={{
          background: "linear-gradient(135deg, #2d3748 0%, #1a202c 100%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Header with Title on Left and Search on Right */}
        <Flex justify="space-between" align="center" mb="xl">
          <Text
            fw={700}
            size="xl"
            c="white"
            style={{
              letterSpacing: "1px",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            🛠️ Node Toolkit
          </Text>

          <TextInput
            placeholder="Search nodes..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
            style={{
              width: "300px",
            }}
            styles={{
              input: {
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                color: "white",
                fontSize: "14px",
                padding: "12px 16px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                "&:focus": {
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.15)",
                },
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.6)",
                },
              },
            }}
          />
        </Flex>

        {/* Nodes Display */}
        {filteredNodes.length > 0 ? (
          <Group gap="lg" justify="center" style={{ display: "flex", flexWrap: "wrap" }}>
            {filteredNodes.map((node) => (
              <DraggableNode
                key={node.type}
                type={node.type}
                label={node.label}
                icon={node.icon}
                description={node.description}
              />
            ))}
          </Group>
        ) : (
          <Text
            c="rgba(255, 255, 255, 0.6)"
            ta="center"
            size="md"
            style={{
              padding: "40px 20px",
              fontStyle: "italic",
            }}
          >
            No nodes found matching "{searchQuery}"
          </Text>
        )}
      </Paper>
    </Container>
  )
}