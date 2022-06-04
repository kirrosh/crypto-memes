import { ITimer } from 'features/realtime'
import { Countdown, Mask } from 'react-daisyui'

type Props = {
  timer: ITimer
}
export const Board = ({ timer }: Props) => {
  const { countdown, turnType, players } = timer
  return (
    <div className="grid place-items-center ">
      <div className="relative p-12 md:w-[400px] w-full">
        <div className="relative">
          <div className="z-10 w-full p-4 bg-[#2e335b] rounded-full aspect-square">
            <div className="w-full h-full bg-[#363c6b] rounded-full" />
          </div>
          <div className="absolute z-20 w-full px-4 mr-1 bg-[#2e335b] aspect-square top-1/4">
            <div className="w-full h-full bg-[#363c6b]" />
          </div>
          <div className="absolute z-30 top-1/2 left-1/2">
            <Countdown value={countdown} />
          </div>
          <div
            className="z-10 w-full p-4 rounded-full aspect-square"
            style={{
              background:
                'linear-gradient(0deg, rgba(46,51,91,1) 0%, rgba(46,51,91,1) 50%, rgba(46,51,91,0) 50%, rgba(46,51,91,0) 100%)',
            }}
          >
            <div className="w-full h-full bg-[#363c6b] rounded-full" />
          </div>
        </div>
        <PLayerPlaces timer={timer} />
      </div>
    </div>
  )
}

type PlacesProps = {
  timer: ITimer
}

const PLayerPlaces = ({ timer }: PlacesProps) => {
  const { players, activeReactions } = timer
  console.log(timer)
  return (
    <>
      <div className="absolute top-5 left-1/2">
        <div className="relative w-12 h-12 ">
          <div className="absolute top-0 w-12 h-12 -left-1/2">
            <Mask
              width={48}
              height={48}
              variant="squircle"
              className="p-6 bg-primary"
            />
            {activeReactions[players[1]?.playerId] && (
              <div className="absolute top-0 z-40 w-24 h-24 ">
                <Mask
                  width={96}
                  height={96}
                  variant="squircle"
                  className="p-2 bg-green-500"
                  src={activeReactions[players[1]?.playerId]?.url}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 left-1/2">
        <div className="relative w-12 h-12 ">
          <div className="absolute top-0 w-12 h-12 -left-1/2 ">
            <div className="block">
              <Mask
                width={48}
                height={48}
                variant="squircle"
                className="p-6 bg-primary"
              />
              {activeReactions[players[2]?.playerId] && (
                <div className="absolute z-40 w-24 h-24 -top-1/2">
                  <Mask
                    width={96}
                    height={96}
                    variant="squircle"
                    className="p-2 bg-green-500"
                    src={activeReactions[players[2]?.playerId]?.url}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute z-30 left-5 top-1/3">
        <div className="relative w-12 h-12 ">
          <div className="absolute left-0 w-12 h-12 -top-1/2">
            <Mask
              width={48}
              height={48}
              variant="squircle"
              className="p-6 bg-primary"
            />
          </div>
        </div>
      </div>
      <div className="absolute z-30 left-5 top-2/3">
        <div className="relative w-12 h-12 ">
          <div className="absolute left-0 w-12 h-12 -top-1/2">
            <Mask
              width={48}
              height={48}
              variant="squircle"
              className="p-6 bg-primary"
            />
          </div>
        </div>
      </div>
      <div className="absolute z-30 right-5 top-1/3">
        <div className="relative w-12 h-12 ">
          <div className="absolute left-0 w-12 h-12 -top-1/2">
            <Mask
              width={48}
              height={48}
              variant="squircle"
              className="p-6 bg-primary"
            />
          </div>
        </div>
      </div>
      <div className="absolute z-30 right-5 top-2/3">
        <div className="relative w-12 h-12 ">
          <div className="absolute left-0 w-12 h-12 -top-1/2">
            <Mask
              width={48}
              height={48}
              variant="squircle"
              className="p-6 bg-primary"
            />
          </div>
        </div>
      </div>
    </>
  )
}
