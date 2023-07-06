import Container from './container'
import cn from 'classnames'

type Props = {
  isAlert?: boolean,
  alertText?: string
}

const Alert = ({ isAlert, alertText }: Props) => {
  return (
    <div
      className={cn('border-b', {
        'bg-neutral-800 border-neutral-800 text-white': isAlert,
        'bg-neutral-50 border-neutral-200': !isAlert,
      })}
      hidden={!isAlert}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {/* {isAlert ? (
            <>
              This page is a preview.{' '}
              <a
                href="/api/exit-preview"
                className="underline hover:text-teal-300 duration-200 transition-colors"
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </>
          ) : (
            <>
              The source code for this blog is{' '}
            </>
          )} */}
          { alertText }
        </div>
      </Container>
    </div>
  )
}

export default Alert
