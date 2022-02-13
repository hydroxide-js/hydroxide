import { Subscription } from '../types/store'

type Updates = [
  computed: Set<Subscription>,
  props: Set<Subscription>,
  connection: Set<Subscription>,
  dom: Set<Subscription>,
  effect: Set<Subscription>
]

export const updates: Updates = [
  new Set(),
  new Set(),
  new Set(),
  new Set(),
  new Set()
]
