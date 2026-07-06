'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material'
import { Theme } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SendIcon from '@mui/icons-material/Send'
import EmailIcon from '@mui/icons-material/Email'

interface ContactPageClientProps {
  toolCountLabel: string
}

const isValidEmail = (email: string) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(
    email.trim(),
  )

export default function ContactPageClient({
  toolCountLabel,
}: ContactPageClientProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const faqs = [
    {
      question: 'How do I submit my AI tool to the directory?',
      answer:
        'You can submit your AI tool by visiting our Submit a Tool page. Our team reviews every submission and will get back to you within 3-5 business days.',
    },
    {
      question: 'Is AI CentralHub free to use?',
      answer: `Yes, AI CentralHub is completely free to browse and use. You can search, filter and explore all ${toolCountLabel} tools without any cost or sign-up required.`,
    },
    {
      question: 'How do I report incorrect information about a tool?',
      answer:
        'If you notice incorrect or outdated information about a tool, please use the contact form on this page and include the tool name and the correct information.',
    },
    {
      question: 'Can I advertise on AI CentralHub?',
      answer:
        "We offer featured placements and sponsored listings for AI tools. Please reach out via the contact form with your requirements and we'll send you our media kit.",
    },
    {
      question: 'How often is the directory updated?',
      answer:
        'We update our directory regularly with new tools and updated information. Our team reviews submissions and monitors the AI landscape to keep listings accurate.',
    },
    {
      question: 'How do I request a tool to be added?',
      answer:
        "If you'd like to see a specific tool added to our directory, use the contact form and include the tool name and URL. We'll review and add it if it meets our quality standards.",
    },
  ]
  const handleSubmit = async () => {
    if (!name || !email || !message || !isValidEmail(email)) return

    setSending(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })

      if (!res.ok) {
        throw new Error('Failed to send')
      }

      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setSending(false)
    }
  }

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      color: (theme: Theme) => theme.customColors.lightText,
      borderRadius: '10px',
      background: (theme: Theme) => theme.customColors.lightBg,
      '& fieldset': {
        borderColor: (theme: Theme) => theme.customColors.lightBorder,
      },
      '&:hover fieldset': {
        borderColor: (theme: Theme) => theme.customColors.lightTextSecondary,
      },
      '&.Mui-focused fieldset': { borderColor: 'primary.main' },
    },
    '& .MuiInputLabel-root': {
      color: (theme: Theme) => theme.customColors.lightTextSecondary,
    },
  }

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
        <Container maxWidth="xl">
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: '0.15em',
            }}>
            Get in touch
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: (theme) => theme.customColors.lightText,
              mt: 0.5,
            }}>
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              mt: 1,
              maxWidth: 560,
              lineHeight: 1.8,
            }}>
            Have a question, suggestion or want to submit your tool? We&apos;d
            love to hear from you.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact form */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                background: (theme) => theme.customColors.lightBg,
                border: (theme) =>
                  `1px solid ${theme.customColors.lightBorder}`,
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                p: 4,
              }}>
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: (theme) => `${theme.palette.primary.main}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'primary.main',
                  }}>
                  <EmailIcon fontSize="small" />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: (theme) => theme.customColors.lightText,
                  }}>
                  Send us a message
                </Typography>
              </Stack>

              {submitted ? (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 6,
                  }}>
                  <Chip
                    label="Message sent!"
                    sx={{
                      background: (theme) => `${theme.palette.primary.main}22`,
                      color: 'primary.main',
                      fontWeight: 700,
                      fontSize: '1rem',
                      px: 2,
                      py: 3,
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      color: (theme) => theme.customColors.lightTextSecondary,
                      mt: 2,
                    }}>
                    Thank you for reaching out. We&apos;ll get back to you as
                    soon as possible.
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={2.5}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        size="small"
                        sx={textFieldSx}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        size="small"
                        error={email !== '' && !isValidEmail(email)}
                        helperText={
                          email !== '' && !isValidEmail(email)
                            ? 'Please enter a valid email address'
                            : ''
                        }
                        sx={textFieldSx}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    label="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    fullWidth
                    size="small"
                    sx={textFieldSx}
                  />
                  <TextField
                    label="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                    multiline
                    rows={6}
                    sx={textFieldSx}
                  />
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={
                      !name ||
                      !email ||
                      !message ||
                      !isValidEmail(email) ||
                      sending
                    }
                    endIcon={<SendIcon />}
                    sx={{
                      fontWeight: 700,
                      borderRadius: '10px',
                      alignSelf: 'flex-start',
                      px: 4,
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      color: '#fff',
                      '&:hover': {
                        background: (theme) =>
                          `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      },
                      '&.Mui-disabled': {
                        background: 'rgba(255,255,255,0.08)',
                        color: 'text.secondary',
                      },
                    }}>
                    {sending ? 'Sending...' : 'Send Message'}
                  </Button>
                  {error && (
                    <Typography variant="body2" sx={{ color: '#FF6B6B' }}>
                      {error}
                    </Typography>
                  )}
                </Stack>
              )}
            </Box>
          </Grid>

          {/* FAQ */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: (theme) => theme.customColors.lightText,
                mb: 3,
              }}>
              Frequently Asked Questions
            </Typography>
            <Stack spacing={1}>
              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  elevation={0}
                  sx={{
                    background: (theme) => theme.customColors.lightBg,
                    border: (theme) =>
                      `1px solid ${theme.customColors.lightBorder}`,
                    borderRadius: '12px !important',
                    '&:before': { display: 'none' },
                    '&.Mui-expanded': {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                  }}>
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{
                          color: (theme) =>
                            theme.customColors.lightTextSecondary,
                        }}
                      />
                    }>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: (theme) => theme.customColors.lightText,
                      }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      variant="body2"
                      sx={{
                        color: (theme) => theme.customColors.lightTextSecondary,
                        lineHeight: 1.8,
                      }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
