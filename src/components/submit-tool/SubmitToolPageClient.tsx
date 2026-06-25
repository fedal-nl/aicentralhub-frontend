'use client'

import { Theme } from '@mui/material/styles'
import { useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Alert,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import LockIcon from '@mui/icons-material/Lock'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { parentCategories } from '@/data/mockData'

const pricingOptions = [
  'free',
  'freemium',
  'paid',
  'free-trial',
  'contact-for-pricing',
]
const appTypeOptions = ['website', 'app', 'chrome-extension', 'api']
const steps = ['Tool Information', 'Details & Pricing', 'SEO & Submit']
const isValidEmail = (email: string) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(
    email.trim(),
  )

export default function SubmitToolPageClient() {
  const [activeStep, setActiveStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const isLoggedIn = false // replace with real auth check when auth is implemented

  // Step 1
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [longDescription, setLongDescription] = useState('')

  // Step 2
  const [pricing, setPricing] = useState('')
  const [appType, setAppType] = useState('')
  const [logoUrl, setLogoUrl] = useState('')

  // Step 3
  const [metaDescription, setMetaDescription] = useState('')
  const [submitterEmail, setSubmitterEmail] = useState('')
  const [submitterName, setSubmitterName] = useState('')

  const selectedParent = parentCategories.find((c) => c.name === category)
  const subcategories = selectedParent?.subcategories ?? []

  const step1Valid = name && url && category && shortDescription
  const step2Valid = pricing && appType
  const step3Valid =
    metaDescription &&
    submitterName &&
    submitterEmail &&
    isValidEmail(submitterEmail)

  const handleNext = () => setActiveStep((prev) => prev + 1)
  const handleBack = () => setActiveStep((prev) => prev - 1)
  const handleSubmit = () => {
    if (!step3Valid) return
    setSubmitted(true)
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

  const selectSx = {
    color: (theme: Theme) => theme.customColors.lightText,
    background: (theme: Theme) => theme.customColors.lightBg,
    borderRadius: '10px',
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: (theme: Theme) => theme.customColors.lightBorder,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: (theme: Theme) => theme.customColors.lightTextSecondary,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.main',
    },
  }

  // Not logged in state
  if (!isLoggedIn) {
    return (
      <Box
        sx={{
          background: (theme) => theme.customColors.lightBgAlt,
          minHeight: '100vh',
        }}>
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
              Directory
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: (theme) => theme.customColors.lightText,
                mt: 0.5,
              }}>
              Submit a Tool
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: (theme) => theme.customColors.lightTextSecondary,
                mt: 1,
                maxWidth: 560,
                lineHeight: 1.8,
              }}>
              Share your AI tool with thousands of users on AI CentralHub.
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="sm" sx={{ py: 10 }}>
          <Box
            sx={{
              background: (theme) => theme.customColors.lightBg,
              border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              p: 6,
              textAlign: 'center',
            }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '16px',
                background: (theme) => `${theme.palette.primary.main}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.main',
                mx: 'auto',
                mb: 3,
              }}>
              <LockIcon sx={{ fontSize: 28 }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: (theme) => theme.customColors.lightText,
                mb: 1.5,
              }}>
              Login Required
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: (theme) => theme.customColors.lightTextSecondary,
                mb: 4,
                lineHeight: 1.8,
              }}>
              You need to be logged in to submit a tool. Create a free account
              or log in to get started.
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: 'center' }}>
              <Button
                component={Link}
                href="/login"
                variant="outlined"
                sx={{
                  fontWeight: 700,
                  borderRadius: '10px',
                  px: 4,
                  borderColor: (theme) => theme.customColors.lightBorder,
                  color: (theme) => theme.customColors.lightText,
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                  },
                }}>
                Login
              </Button>
              <Button
                component={Link}
                href="/signup"
                variant="contained"
                sx={{
                  fontWeight: 700,
                  borderRadius: '10px',
                  px: 4,
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  color: '#fff',
                  '&:hover': {
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  },
                }}>
                Sign Up Free
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    )
  }

  // Submitted state
  if (submitted) {
    return (
      <Box
        sx={{
          background: (theme) => theme.customColors.lightBgAlt,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}>
        <Container maxWidth="sm">
          <Box
            sx={{
              background: (theme) => theme.customColors.lightBg,
              border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              p: 6,
              textAlign: 'center',
            }}>
            <CheckCircleIcon
              sx={{ fontSize: 56, color: 'primary.main', mb: 2 }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: (theme) => theme.customColors.lightText,
                mb: 1.5,
              }}>
              Tool Submitted!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: (theme) => theme.customColors.lightTextSecondary,
                mb: 4,
                lineHeight: 1.8,
              }}>
              Thank you for submitting <strong>{name}</strong>. Our team will
              review it and get back to you at {submitterEmail} within 3-5
              business days.
            </Typography>
            <Button
              component={Link}
              href="/ai-tools"
              variant="contained"
              sx={{
                fontWeight: 700,
                borderRadius: '10px',
                px: 4,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: '#fff',
              }}>
              Browse AI Tools
            </Button>
          </Box>
        </Container>
      </Box>
    )
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
            Directory
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: (theme) => theme.customColors.lightText,
              mt: 0.5,
            }}>
            Submit a Tool
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              mt: 1,
              maxWidth: 560,
              lineHeight: 1.8,
            }}>
            Share your AI tool with thousands of users on AI CentralHub. Fill in
            the details below and our team will review your submission.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 8 }}>
        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  '& .MuiStepLabel-label': {
                    color: (theme) => theme.customColors.lightTextSecondary,
                    '&.Mui-active': { color: 'primary.main', fontWeight: 700 },
                    '&.Mui-completed': {
                      color: (theme) => theme.customColors.lightText,
                    },
                  },
                  '& .MuiStepIcon-root': {
                    color: (theme) => theme.customColors.lightBorder,
                    '&.Mui-active': { color: 'primary.main' },
                    '&.Mui-completed': { color: 'primary.main' },
                  },
                }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box
          sx={{
            background: (theme) => theme.customColors.lightBg,
            border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            p: 4,
          }}>
          {/* Step 1 — Tool Information */}
          {activeStep === 0 && (
            <Stack spacing={3}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: (theme) => theme.customColors.lightText,
                }}>
                Tool Information
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Tool Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    size="small"
                    sx={textFieldSx}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Tool URL *"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    fullWidth
                    size="small"
                    placeholder="https://"
                    sx={textFieldSx}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value)
                      setSubcategory('')
                    }}
                    displayEmpty
                    fullWidth
                    size="small"
                    sx={selectSx}>
                    <MenuItem value="">Select Category *</MenuItem>
                    {parentCategories.map((cat) => (
                      <MenuItem key={cat.slug} value={cat.name}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Select
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    displayEmpty
                    fullWidth
                    size="small"
                    disabled={!category}
                    sx={selectSx}>
                    <MenuItem value="">Select Subcategory</MenuItem>
                    {subcategories.map((sub) => (
                      <MenuItem key={sub.slug} value={sub.name}>
                        {sub.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>

              <TextField
                label="Short Description *"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                fullWidth
                size="small"
                helperText={`${shortDescription.length}/160 characters`}
                slotProps={{ htmlInput: { maxLength: 160 } }}
                sx={textFieldSx}
              />

              <TextField
                label="Full Description"
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                fullWidth
                multiline
                rows={5}
                helperText="Describe your tool in detail — features, use cases, target audience"
                sx={textFieldSx}
              />
            </Stack>
          )}

          {/* Step 2 — Details & Pricing */}
          {activeStep === 1 && (
            <Stack spacing={3}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: (theme) => theme.customColors.lightText,
                }}>
                Details & Pricing
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Select
                    value={pricing}
                    onChange={(e) => setPricing(e.target.value)}
                    displayEmpty
                    fullWidth
                    size="small"
                    sx={selectSx}>
                    <MenuItem value="">Select Pricing *</MenuItem>
                    {pricingOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option
                          .split('-')
                          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                          .join(' ')}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Select
                    value={appType}
                    onChange={(e) => setAppType(e.target.value)}
                    displayEmpty
                    fullWidth
                    size="small"
                    sx={selectSx}>
                    <MenuItem value="">Select App Type *</MenuItem>
                    {appTypeOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option
                          .split('-')
                          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                          .join(' ')}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>

              <TextField
                label="Logo URL"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                fullWidth
                size="small"
                placeholder="https://yourtool.com/logo.png"
                helperText="Direct link to your tool's logo (PNG or SVG, min 200x200px recommended)"
                sx={textFieldSx}
              />

              <Alert
                severity="info"
                sx={{
                  background: (theme) => `${theme.palette.primary.main}11`,
                  color: (theme) => theme.customColors.lightText,
                  border: (theme) =>
                    `1px solid ${theme.palette.primary.main}33`,
                  borderRadius: '10px',
                  '& .MuiAlert-icon': { color: 'primary.main' },
                }}>
                If you don&apos;t have a logo URL, our team will source one
                during the review process.
              </Alert>
            </Stack>
          )}

          {/* Step 3 — SEO & Submit */}
          {activeStep === 2 && (
            <Stack spacing={3}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: (theme) => theme.customColors.lightText,
                }}>
                SEO & Contact Details
              </Typography>

              <TextField
                label="Meta Description *"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                fullWidth
                size="small"
                helperText={`${metaDescription.length}/160 characters — shown in Google search results`}
                slotProps={{ htmlInput: { maxLength: 160 } }}
                sx={textFieldSx}
              />

              <Divider
                sx={{
                  borderColor: (theme) => theme.customColors.lightBorderSubtle,
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  color: (theme) => theme.customColors.lightTextSecondary,
                }}>
                Your contact details — so we can reach you about your
                submission.
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Your Name *"
                    value={submitterName}
                    onChange={(e) => setSubmitterName(e.target.value)}
                    fullWidth
                    size="small"
                    sx={textFieldSx}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Your Email *"
                    type="email"
                    value={submitterEmail}
                    onChange={(e) => setSubmitterEmail(e.target.value)}
                    fullWidth
                    size="small"
                    error={
                      submitterEmail !== '' && !isValidEmail(submitterEmail)
                    }
                    helperText={
                      submitterEmail !== '' && !isValidEmail(submitterEmail)
                        ? 'Please enter a valid email address'
                        : ''
                    }
                    sx={textFieldSx}
                  />
                </Grid>
              </Grid>

              {/* Summary */}
              <Box
                sx={{
                  background: (theme) => theme.customColors.lightBgAlt,
                  border: (theme) =>
                    `1px solid ${theme.customColors.lightBorderSubtle}`,
                  borderRadius: '12px',
                  p: 3,
                }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: (theme) => theme.customColors.lightText,
                    mb: 2,
                  }}>
                  Submission Summary
                </Typography>
                <Stack spacing={1}>
                  {[
                    { label: 'Tool', value: name },
                    { label: 'URL', value: url },
                    {
                      label: 'Category',
                      value: `${category}${subcategory ? ` → ${subcategory}` : ''}`,
                    },
                    {
                      label: 'Pricing',
                      value: pricing
                        .split('-')
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' '),
                    },
                    {
                      label: 'App Type',
                      value: appType
                        .split('-')
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' '),
                    },
                  ].map((item) => (
                    <Stack key={item.label} direction="row" spacing={2}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: (theme) =>
                            theme.customColors.lightTextSecondary,
                          minWidth: 80,
                        }}>
                        {item.label}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: (theme) => theme.customColors.lightText,
                          fontWeight: 600,
                        }}>
                        {item.value}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Stack>
          )}

          {/* Navigation buttons */}
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 4,
            }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{
                fontWeight: 600,
                borderRadius: '10px',
                color: (theme) => theme.customColors.lightTextSecondary,
                '&:hover': { color: (theme) => theme.customColors.lightText },
              }}>
              Back
            </Button>

            <Stack direction="row" spacing={1}>
              {steps.map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: i === activeStep ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: (theme) =>
                      i === activeStep
                        ? theme.palette.primary.main
                        : i < activeStep
                          ? `${theme.palette.primary.main}66`
                          : theme.customColors.lightBorder,
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Stack>

            {activeStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                variant="contained"
                disabled={activeStep === 0 ? !step1Valid : !step2Valid}
                sx={{
                  fontWeight: 700,
                  borderRadius: '10px',
                  px: 4,
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  color: '#fff',
                  '&:hover': {
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  },
                  '&.Mui-disabled': {
                    background: (theme) => theme.customColors.lightChipBg,
                    color: (theme) => theme.customColors.lightTextSecondary,
                  },
                }}>
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={!step3Valid}
                endIcon={<SendIcon />}
                sx={{
                  fontWeight: 700,
                  borderRadius: '10px',
                  px: 4,
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  color: '#fff',
                  '&:hover': {
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  },
                  '&.Mui-disabled': {
                    background: (theme) => theme.customColors.lightChipBg,
                    color: (theme) => theme.customColors.lightTextSecondary,
                  },
                }}>
                Submit Tool
              </Button>
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
