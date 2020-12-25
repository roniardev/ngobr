import tw, { css, styled, theme } from 'twin.macro'

const Button = styled.button(({ isPrimary, isSecondary, isSmall }) => [
  // The common button styles added with the tw import
  tw`shadow-md rounded-lg border-2 px-4 text-lg font-medium `,
  tw`transform transition duration-500 ease-in-out`,

  // Use the variant grouping feature to add variants to multiple classes
  tw`hocus:(scale-105  -translate-y-1  border-green-100)`,

  // Use props to conditionally style your components
  isPrimary && tw`bg-green-400 text-white`,

  // Combine regular css with tailwind classes within backticks
  isSecondary && [
    css`
      box-shadow: 0 0.1em 0 0 rgba(0, 0, 0, 0.25);
    `,
    tw`border-2 border-green-600`
  ],

  // Conditional props can be added
  isSmall ? tw`text-sm` : tw`text-lg`
])

export default Button
