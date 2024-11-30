import {
  IconBrain,
  IconBuilding,
  IconLock,
  IconScissors,
  IconUpload,
  IconUsers,
  TablerIcon,
} from '@tabler/icons-react'

export type FeatureType = {
  title: string
  description: string
  icon: TablerIcon
}

const floorplanFeatures: FeatureType[] = [
  {
    title: 'Gestión de organizaciones',
    description:
      'Creá organizaciones donde agrupar todos tus proyectos. Invitá colaboradores y contolá quienes pueden acceder a tu organización fácilmente.',
    icon: IconUsers,
  },
  {
    title: 'Proyectos estructurados',
    description:
      'Mantené tus proyectos bien organizados con una estructura clara. Accedé fácilmente a toda la información desde cualquier lugar y dispositivo.',
    icon: IconBuilding,
  },
  {
    title: 'Procesamiento con IA',
    description:
      'Aprovechá nuestra poderosa inteligencia artificial para analizar tus planos. Identificá elementos clave automáticamente y ahorrá tiempo y dinero reduciendo errores manuales.',
    icon: IconBrain,
  },
  {
    title: 'Carga de planos',
    description:
      'Simplificá el manejo de planos digitales. Subí todos tus planos en archivos de alta definición y almacenálos en la nube.',
    icon: IconUpload,
  },
  {
    title: 'Recorte de planos',
    description:
      'Realizá recortes de los planos con nuestra fabulos herramienta de recoretes y catalogalos según su tipo.',
    icon: IconScissors,
  },
  {
    title: 'Almacenamiento seguro',
    description:
      'Guardá tus proyectos y planos en un entorno seguro y confiable. Accedé a tus datos cuando los necesites con respaldo constante en la nube.',
    icon: IconLock,
  },
]

export default floorplanFeatures
