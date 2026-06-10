'use client'

import { Box, Container, Typography, Stack } from '@mui/material'

interface Section {
  title: string
  content: string[]
}

interface PolicyContent {
  title: string
  lastUpdated: string
  introduction: string
  sections: Section[]
}

interface Props {
  content: PolicyContent
}

export default function PolicyPageClient({ content }: Props) {
  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBgAlt,
        minHeight: '100vh',
      }}>
      {/* Header */}
      <Box
        sx={{
          background: (theme) => theme.customColors.lightBg,
          borderBottom: (theme) =>
            `1px solid ${theme.customColors.lightBorderSubtle}`,
          py: 8,
        }}>
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: '0.15em',
            }}>
            Legal
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: (theme) => theme.customColors.lightText,
              mt: 0.5,
            }}>
            {content.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              mt: 1,
            }}>
            Last updated: {content.lastUpdated}
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box
          sx={{
            background: (theme) => theme.customColors.lightBg,
            border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            p: { xs: 3, md: 6 },
          }}>
          {/* Introduction */}
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              lineHeight: 1.9,
              mb: 5,
            }}>
            {content.introduction}
          </Typography>

          {/* Sections */}
          <Stack spacing={5}>
            {content.sections.map((section, index) => (
              <Box key={index}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: (theme) => theme.customColors.lightText,
                    mb: 2,
                  }}>
                  {index + 1}. {section.title}
                </Typography>
                <Stack spacing={1.5}>
                  {section.content.map((paragraph, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      sx={{
                        color: (theme) => theme.customColors.lightTextSecondary,
                        lineHeight: 1.9,
                      }}>
                      {paragraph}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
