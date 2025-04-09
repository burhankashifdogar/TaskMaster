/**
 * Routes configuration file
 *
 * This file centralizes all route definitions for the application.
 * Use these constants instead of hardcoding paths throughout the app
 * to make route management and updates easier.
 */

// Authentication routes
export const AUTH_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
}

// Main app routes
export const APP_ROUTES = {
  HOME: "/",
  TODAY: "/today",
  CALENDAR: "/calendar",
  ANALYTICS: "/analytics",
  OVERDUE: "/overdue",
}

// Category routes
export const CATEGORY_ROUTES = {
  WORK: "/categories/work",
  PERSONAL: "/categories/personal",
  DEVELOPMENT: "/categories/dev",
  HEALTH: "/categories/health",
  FINANCE: "/categories/finance",
}

// Marketing routes
export const MARKETING_ROUTES = {
  LANDING: "/",
  ABOUT: "/about",
  PRICING: "/pricing",
  CONTACT: "/contact",
}

// Helper functions
export const isAuthRoute = (path: string): boolean => {
  return Object.values(AUTH_ROUTES).includes(path)
}

export const isAppRoute = (path: string): boolean => {
  return Object.values(APP_ROUTES).includes(path) || Object.values(CATEGORY_ROUTES).includes(path)
}

export const isMarketingRoute = (path: string): boolean => {
  return Object.values(MARKETING_ROUTES).includes(path)
}

// Add a helper function to check if a route is a public route
export const isPublicRoute = (path: string): boolean => {
  // Marketing routes are public
  if (isMarketingRoute(path)) return true

  // Auth routes are public
  if (isAuthRoute(path)) return true

  // Add any other public routes here
  const otherPublicRoutes = ["/"]
  if (otherPublicRoutes.includes(path)) return true

  return false
}

/**
 * Get route with query parameters
 * @param base - Base route path
 * @param params - Object containing query parameters
 * @returns Route with query parameters
 */
export const getRouteWithParams = (base: string, params: Record<string, string>): string => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value)
  })

  const queryString = searchParams.toString()
  return queryString ? `${base}?${queryString}` : base
}

/**
 * Get category route
 * @param category - Category name
 * @returns Route for the specified category
 */
export const getCategoryRoute = (category: string): string => {
  const categoryKey = category.toUpperCase() as keyof typeof CATEGORY_ROUTES
  return CATEGORY_ROUTES[categoryKey] || "/categories/" + category.toLowerCase()
}
