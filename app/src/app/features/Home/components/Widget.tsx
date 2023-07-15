import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  SvgIconTypeMap,
  Divider,
  SxProps,
  Theme,
  Zoom,
} from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  actionButtons?: ReactNode
  title: string
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
  sx?: SxProps<Theme> | undefined
  contentSx?: SxProps<Theme> | undefined
}

const Widget = ({
  children,
  actionButtons,
  title,
  Icon,
  sx = {},
  contentSx = {},
}: Props) => {
  return (
    <Zoom in={true} timeout={700}>
      <Card sx={{ minWidth: 300, ...sx }} elevation={1}>
        <CardHeader
          title={<Typography variant="h6">{title}</Typography>}
          action={actionButtons}
          avatar={
            <Icon sx={{ color: (theme) => theme.palette.secondary.main }} />
          }
        />
        <Divider />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            ...contentSx,
          }}
        >
          {children}
        </CardContent>
      </Card>
    </Zoom>
  )
}

export default Widget
