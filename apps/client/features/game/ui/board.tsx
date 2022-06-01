import { Mask } from 'react-daisyui'

export const Board = () => {
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
        <PLayerPlaces />
      </div>
    </div>
  )
}

const PLayerPlaces = () => {
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
            <div className="absolute top-0 w-24 h-24 bg-black"></div>
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
