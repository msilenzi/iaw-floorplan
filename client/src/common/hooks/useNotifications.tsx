import { Text } from '@mantine/core'
import { NotificationData, notifications } from '@mantine/notifications'

type CustomNotificationData = {
  title: string
  message: string
  autoClose?: NotificationData['autoClose']
}

export function useNotifications() {
  function showSuccessNotification({
    title,
    message,
    autoClose = 5_000, // Por defecto se cierran después de 5 segundos
  }: CustomNotificationData) {
    notifications.show({
      title: <Text fw={700}>{title}</Text>,
      message,
      color: 'teal',
      radius: 'sm',
      autoClose: autoClose,
      withBorder: true,
    })
  }

  function showErrorNotification({
    title,
    message,
    autoClose = 15_000,
  }: CustomNotificationData) {
    notifications.show({
      title: <Text fw={700}>{title}</Text>,
      message,
      color: 'red',
      radius: 'sm',
      autoClose: autoClose,
      withBorder: true,
    })
  }

  return { showSuccessNotification, showErrorNotification }
}
