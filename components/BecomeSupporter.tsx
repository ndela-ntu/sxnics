import Link from "next/link";

export default function BecomeSupporter() {
  return (
    <div className="flex items-center justify-center relative w-full h-[200px] md:h-[300px] lg:h-[400px]">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1366 685"
        preserveAspectRatio="none"
        fill="none"
        className="absolute inset-0 w-full h-full"
      >
        <path
          d="M0 0 C450.78 0 901.56 0 1366 0 C1366 226.05 1366 452.1 1366 685 C915.22 685 464.44 685 0 685 C0 458.95 0 232.9 0 0 Z "
          fill="#010101"
          transform="translate(0,0)"
        />
        <path
          d="M0 0 C0.9796019 -0.00423477 1.9592038 -0.00846954 2.9684906 -0.01283264 C6.20559833 -0.02284855 9.44256676 -0.02272347 12.6796875 -0.01953125 C14.34582596 -0.01862488 14.34582596 -0.01862488 16.04562378 -0.0177002 C36.94187808 0.01310002 57.7125851 0.69868088 78.5546875 2.16796875 C79.465672 2.23113281 80.37665649 2.29429687 81.31524658 2.359375 C121.62081063 5.16976916 162.13708406 8.96745535 201.5546875 18.16796875 C202.6674707 18.42658691 203.78025391 18.68520508 204.92675781 18.95166016 C217.2619677 21.88733238 229.18842469 25.52646524 240.9921875 30.16796875 C241.9922583 30.55887695 242.9923291 30.94978516 244.02270508 31.35253906 C255.27212871 35.96545552 265.88148991 41.83748609 271.9921875 52.73046875 C273.04092556 57.27500034 273.01494569 60.88947378 271.4296875 65.29296875 C267.45615013 71.38572606 262.43240068 74.29682619 255.5546875 76.16796875 C251.45635609 76.95414927 247.57811018 77.29593576 243.40771484 77.30981445 C241.61326431 77.32036613 241.61326431 77.32036613 239.78256226 77.33113098 C238.49822296 77.33529526 237.21388367 77.33945953 235.890625 77.34375 C234.53462975 77.35420255 233.17864169 77.36562974 231.82266235 77.37797546 C226.09860782 77.4299357 220.37467491 77.47816638 214.65039062 77.49389648 C184.55047367 77.58925334 158.98062343 81.21734479 133.5546875 98.16796875 C132.65962882 84.74208855 138.09968592 74.87025151 146.515625 64.828125 C156.9286834 53.50537562 172.44835494 46.52987091 187.5546875 44.16796875 C189.32446511 44.10337833 191.09638902 44.0818581 192.8671875 44.10546875 C194.19169922 44.11900391 194.19169922 44.11900391 195.54296875 44.1328125 C196.53876953 44.15021484 196.53876953 44.15021484 197.5546875 44.16796875 C197.5546875 43.50796875 197.5546875 42.84796875 197.5546875 42.16796875 C177.35443624 45.20913265 155.60923683 50.42856964 142.65625 67.69921875 C136.29165995 77.25953123 133.27503301 85.86219428 131.94921875 97.26171875 C131.5546875 100.16796875 131.5546875 100.16796875 130.5546875 102.16796875 C131.2146875 102.16796875 131.8746875 102.16796875 132.5546875 102.16796875 C132.70164062 103.00199219 132.84859375 103.83601563 133 104.6953125 C135.88024567 119.14620027 143.03732683 127.14872126 155.1171875 135.23046875 C158.23559604 137.50858756 158.48413076 137.8210648 159.3046875 141.85546875 C158.5546875 145.16796875 158.5546875 145.16796875 156.9609375 146.7734375 C153.80455608 148.602704 150.88828052 149.13283319 147.3046875 149.79296875 C146.04140625 150.03273438 144.778125 150.2725 143.4765625 150.51953125 C110.57791412 155.95894921 79.08296162 149.46111835 51.30859375 131.01171875 C48.31113826 128.81438086 45.42585279 126.52777874 42.5546875 124.16796875 C41.9968457 123.7208252 41.43900391 123.27368164 40.86425781 122.81298828 C12.91621453 100.36051997 -5.03739559 66.5888213 -10.14501953 31.11523438 C-11.14559166 21.29498497 -11.21138969 11.01285318 -10.4453125 1.16796875 C-8.25928048 -1.01806327 -3.04247196 0.00391638 0 0 Z "
          fill="#010101"
          transform="translate(526.4453125,248.83203125)"
        />
        <path
          d="M0 0 C51.81 0 103.62 0 157 0 C157.33 14.52 157.66 29.04 158 44 C174.2239562 51.73649475 174.2239562 51.73649475 190.875 57.875 C191.968125 58.23851562 193.06125 58.60203125 194.1875 58.9765625 C201.70388374 61.42871606 209.27154767 63.34152704 217 65 C217 65.33 217 65.66 217 66 C210.27210598 65.50905515 203.98145089 64.49101771 197.5 62.625 C196.62432373 62.37532471 195.74864746 62.12564941 194.84643555 61.8684082 C182.24446877 58.08770843 169.76906583 52.88453291 158 47 C158.00222061 47.79132324 158.00444122 48.58264648 158.00672913 49.39794922 C158.02693068 56.92763041 158.04207401 64.4572981 158.05181217 71.98699951 C158.05698725 75.85625381 158.06398467 79.72548535 158.07543945 83.59472656 C158.08646262 87.34247047 158.09231707 91.09019277 158.09487724 94.83795166 C158.09669707 96.25376729 158.10024861 97.669582 158.10573006 99.08538818 C158.10947545 100.09475433 158.10947545 100.09475433 158.11329651 101.12451172 C158.11599832 101.70723846 158.11870012 102.28996521 158.1214838 102.89035034 C158.09012719 111.69500039 157.55326376 120.14777986 157 129 C105.19 129 53.38 129 0 129 C0 86.43 0 43.86 0 0 Z "
          fill="#FCFCFC"
          transform="translate(399,442)"
        />
        <path
          d="M0 0 C47.52 0 95.04 0 144 0 C143.875 55.6875 143.875 55.6875 143.75732422 73.20581055 C143.77050612 78.4334173 143.77050612 78.4334173 143.79690552 83.66096497 C143.80227107 85.97125702 143.78815716 88.28164852 143.75808716 90.5917511 C143.37998996 108.74885816 143.37998996 108.74885816 152.56193542 123.65142822 C153.76877739 124.81397125 153.76877739 124.81397125 155 126 C156.03836006 127.39981814 157.04866783 128.82225962 157.99609375 130.28515625 C158.4044043 130.90825684 158.81271484 131.53135742 159.23339844 132.17333984 C159.63075195 132.7967627 160.02810547 133.42018555 160.4375 134.0625 C160.8799707 134.7529541 161.32244141 135.4434082 161.77832031 136.15478516 C165.44457827 141.9607671 168.89088627 147.88682641 172.25 153.875 C172.74040771 154.73746338 173.23081543 155.59992676 173.73608398 156.48852539 C174.17895752 157.29410889 174.62183105 158.09969238 175.078125 158.9296875 C175.47418945 159.64366699 175.87025391 160.35764648 176.27832031 161.09326172 C177 163 177 163 176 166 C175.7097998 165.44352783 175.41959961 164.88705566 175.12060547 164.3137207 C166.21880885 147.35453241 156.12629032 131.57680644 145 116 C144.67 123.26 144.34 130.52 144 138 C96.48 138 48.96 138 0 138 C0 92.46 0 46.92 0 0 Z "
          fill="#FEFEFE"
          transform="translate(1012,121)"
        />
        <path
          d="M0 0 C0 0.66 0 1.32 0 2 C-0.5583252 2.01458252 -1.11665039 2.02916504 -1.69189453 2.04418945 C-59.17281617 3.67122494 -117.67682928 9.29521242 -173.49267578 23.45263672 C-176 24 -176 24 -179 24 C-179 24.66 -179 25.32 -179 26 C-178.26394531 26.26554687 -177.52789063 26.53109375 -176.76953125 26.8046875 C-161.74979581 33.2871121 -151.92509917 48.54344096 -146.04296875 63.078125 C-139.7452903 80.72105938 -141.84328828 99.19188353 -149.3515625 116.03125 C-158.03184188 133.2948224 -172.47229862 144.38821643 -190.24609375 151.25390625 C-210.17191669 157.62928104 -230.28829635 154.92058089 -248.75 145.875 C-264.15164683 137.08497824 -274.46168471 123.50808606 -281.12109375 107.265625 C-282.31560183 102.82736385 -282.5547585 98.51706177 -282.75 93.9375 C-282.79092773 93.01026123 -282.83185547 92.08302246 -282.87402344 91.12768555 C-283.11205313 84.07329533 -283.25437698 76.77463287 -281 70 C-279.515 69.01 -279.515 69.01 -278 68 C-277.67 67.01 -277.34 66.02 -277 65 C-274.71503293 63.40698123 -272.47434427 62.0030783 -270.0625 60.625 C-269.31162109 60.19292236 -268.56074219 59.76084473 -267.78710938 59.31567383 C-251.31156831 49.98140261 -234.42715693 41.91234395 -216.8125 35 C-216.13179443 34.73254974 -215.45108887 34.46509949 -214.74975586 34.18954468 C-205.26382957 30.48222128 -195.68900383 27.13853246 -186 24 C-187.00667725 23.70279053 -188.01335449 23.40558105 -189.05053711 23.09936523 C-192.65222168 22.03601074 -192.65222168 22.03601074 -196.25390625 20.97265625 C-214.17260853 16.32014648 -232.77243958 19.33773581 -249 28 C-260.75307156 35.4274859 -269.39115271 44.81898735 -276 57 C-276.495 55.515 -276.495 55.515 -277 54 C-275.77131494 51.7931971 -274.53312825 49.84862017 -273.0625 47.8125 C-272.64572998 47.22952148 -272.22895996 46.64654297 -271.79956055 46.04589844 C-260.56172332 30.63474003 -243.86250707 20.39425479 -225 17 C-221.49546802 16.68207536 -218.01772793 16.61975611 -214.5 16.625 C-213.06382324 16.62415405 -213.06382324 16.62415405 -211.59863281 16.62329102 C-202.61594701 16.7604141 -193.14337512 17.92831244 -185 22 C-178.28591677 22.44861938 -172.63589972 21.07774609 -166.1875 19.3125 C-113.93077661 5.74604346 -54.06163086 -1.57716265 0 0 Z "
          fill="#F9F9F9"
          transform="translate(882,58)"
        />
        <path
          d="M0 0 C32.34 0 64.68 0 98 0 C98 30.69 98 61.38 98 93 C65.66 93 33.32 93 0 93 C0 62.31 0 31.62 0 0 Z "
          fill="#FFFFFF"
          transform="translate(859,225)"
        />
        <path
          d="M0 0 C0.495 0.99 0.495 0.99 1 2 C0.01200396 4.14016061 -1.06829772 6.23793743 -2.1875 8.3125 C-7.84028735 19.12848535 -11.17823342 30.10725797 -11.0625 42.375 C-11.05347656 43.62023437 -11.04445312 44.86546875 -11.03515625 46.1484375 C-11.02355469 47.08945313 -11.01195312 48.03046875 -11 49 C-10.36312256 49.06469482 -9.72624512 49.12938965 -9.07006836 49.19604492 C40.46429228 54.35633555 83.60152822 69.67356813 121 103 C124.21043882 101.61811547 126.04936365 100.07578097 128.25 97.375 C128.77078125 96.74335938 129.2915625 96.11171875 129.828125 95.4609375 C130.21484375 94.97882813 130.6015625 94.49671875 131 94 C131 99.55693507 126.74660389 103.20623606 123 107 C104.21072921 122.58829202 82.30742828 130.04227781 58 128 C39.0429145 125.50311944 23.52967365 117.31003609 10 104 C8.83984375 102.85917969 8.83984375 102.85917969 7.65625 101.6953125 C-6.3330296 87.0832225 -10.97259813 70.67811213 -14 51 C-30.17 51 -46.34 51 -63 51 C-63 50.34 -63 49.68 -63 49 C-46.5 49 -30 49 -13 49 C-13 43.72 -13 38.44 -13 33 C-11.64498304 22.73039778 -7.57861957 7.57861957 0 0 Z "
          fill="#FBFBFB"
          transform="translate(251,182)"
        />
        <path
          d="M0 0 C-2.71105804 1.80737203 -4.57449072 2.6148925 -7.62890625 3.55859375 C-8.56798828 3.85604492 -9.50707031 4.15349609 -10.47460938 4.45996094 C-11.49361328 4.78254883 -12.51261719 5.10513672 -13.5625 5.4375 C-39.26322114 13.82020038 -65.13655567 24.80158052 -87.8046875 39.671875 C-90 41 -90 41 -92 41 C-92.185625 41.9590625 -92.185625 41.9590625 -92.375 42.9375 C-92.58125 43.618125 -92.7875 44.29875 -93 45 C-93.99 45.495 -93.99 45.495 -95 46 C-97.81989511 55.89436881 -96.89431041 65.90879466 -96 76 C-96.99 76.495 -96.99 76.495 -98 77 C-98.91485343 71.56170463 -99.15225218 66.32198167 -99.125 60.8125 C-99.12886719 60.01908203 -99.13273438 59.22566406 -99.13671875 58.40820312 C-99.13542969 57.64056641 -99.13414062 56.87292969 -99.1328125 56.08203125 C-99.13168457 55.39343018 -99.13055664 54.7048291 -99.12939453 53.99536133 C-98.9931888 51.89496612 -98.56989107 50.02234931 -98 48 C-137.37715034 74.87839384 -167.83348422 112.68302503 -178.58984375 159.8203125 C-178.85531006 160.98062988 -179.12077637 162.14094727 -179.39428711 163.33642578 C-179.69411499 164.65489502 -179.69411499 164.65489502 -180 166 C-179.30764252 165.99555878 -178.61528503 165.99111755 -177.90194702 165.98654175 C-135.24263015 165.72576296 -93.28476374 166.46712065 -50.8125 170.875 C-49.03303482 171.05932587 -49.03303482 171.05932587 -47.21762085 171.24737549 C74.72828681 184.03094236 74.72828681 184.03094236 100 214 C103.39762019 219.71041265 103.86525016 224.48631902 103 231 C99.95625328 237.32162781 95.15290921 241.42422168 88.625 243.75 C80.82562559 246.26215805 72.79177925 246.11831034 64.6953125 246.02734375 C62.47916831 246.01468344 60.26302238 246.00232354 58.046875 245.99023438 C54.60052904 245.96561065 51.15427705 245.93778658 47.70800781 245.90405273 C22.53603753 245.55358591 22.53603753 245.55358591 -2.125 250.125 C-2.85452881 250.33455322 -3.58405762 250.54410645 -4.33569336 250.76000977 C-15.72600004 254.23058028 -26.41306259 259.96957923 -36 267 C-35.25736492 278.51084376 -31.73802856 287.21521092 -23 295 C-20.16850771 296.96790625 -17.30704137 298.77003464 -14.3203125 300.4921875 C-12 302 -12 302 -10 305 C-9.33786923 311.06953203 -9.33786923 311.06953203 -11.484375 314.0859375 C-14.97798276 316.74411731 -18.36912524 317.35891489 -22.625 318.1875 C-23.4389624 318.35475586 -24.2529248 318.52201172 -25.09155273 318.69433594 C-58.2872021 325.34076229 -91.05729847 318.19025938 -119.18359375 299.6328125 C-152.6237333 276.87482172 -173.36415943 243.24830063 -181.6796875 203.7734375 C-183.63534741 192.33416653 -184.94576687 178.33531092 -182 167 C-183.11375 167.15339844 -184.2275 167.30679688 -185.375 167.46484375 C-190.24179293 168.07105456 -195.10247218 168.34188248 -200 168.5625 C-200.90903076 168.6049585 -201.81806152 168.64741699 -202.75463867 168.69116211 C-210.84123314 169.04306102 -218.90687713 169.10302419 -227 169 C-227 168.67 -227 168.34 -227 168 C-220.99878586 167.17344389 -215.05034006 166.71004792 -209 166.4375 C-208.09096924 166.3950415 -207.18193848 166.35258301 -206.24536133 166.30883789 C-198.15876686 165.95693898 -190.09312287 165.89697581 -182 166 C-181.93683594 165.37738281 -181.87367188 164.75476563 -181.80859375 164.11328125 C-177.67737652 132.93346276 -160.3138628 102.63402127 -139 80 C-138.35579102 79.31341309 -137.71158203 78.62682617 -137.04785156 77.91943359 C-126.07607998 66.34258261 -114.46729682 55.22613062 -100.68359375 47.02734375 C-97.45529339 44.58849676 -96.64763572 42.71804219 -95.3125 38.9375 C-93.94343224 35.13139755 -92.9355496 32.74329698 -90 30 C-88.93009099 28.30921115 -87.8914109 26.59847936 -86.875 24.875 C-77.17019088 9.54099806 -61.48746012 -0.44364674 -43.9765625 -4.7421875 C-29.02413722 -7.60708788 -13.88349145 -6.33811566 0 0 Z M-181 168 C-182.23815666 183.91159399 -181.26401666 199.62993536 -177 215 C-176.79101074 215.75539063 -176.58202148 216.51078125 -176.36669922 217.2890625 C-168.10232623 246.11222403 -152.19045316 272.86586173 -128 291 C-127.11441406 291.72316406 -126.22882813 292.44632812 -125.31640625 293.19140625 C-99.93142464 313.4360171 -68.28062118 321.6936954 -36.18164062 318.74072266 C-23.21413211 317.71687411 -23.21413211 317.71687411 -12 312 C-11.16212879 308.75789481 -11.16212879 308.75789481 -12 305 C-14.68667036 302.24038836 -17.84367331 300.18930281 -21 298 C-31.42571798 289.9224167 -35.70929158 282.00077499 -38 269 C-38.66 269 -39.32 269 -40 269 C-39.37158775 265.65832547 -38.69366465 262.32871778 -38 259 C-37.70802734 257.54013672 -37.70802734 257.54013672 -37.41015625 256.05078125 C-34.251741 241.75381283 -26.92731212 230.74136881 -14.72265625 222.66015625 C-1.61499012 214.6676769 11.83387848 210.91465986 27 209 C27 209.66 27 210.32 27 211 C26.45214844 210.95359375 25.90429688 210.9071875 25.33984375 210.859375 C9.47160277 210.1369185 -7.76205547 217.14018292 -19.625 227.5625 C-21.10738022 229.01756668 -22.56862537 230.49473032 -24 232 C-24.87205078 232.87785156 -24.87205078 232.87785156 -25.76171875 233.7734375 C-33.32738502 241.8917595 -37.32812098 252.24682388 -37.0703125 263.27734375 C-37.04710937 263.84582031 -37.02390625 264.41429687 -37 265 C-36.3915625 264.57589844 -35.783125 264.15179688 -35.15625 263.71484375 C-15.35099844 250.46280043 6.82894195 244.73108187 30.53125 244.69140625 C31.89783777 244.6802664 33.26441577 244.66786481 34.63098145 244.65428162 C40.36636778 244.59959448 46.10181572 244.56826402 51.83740234 244.54370117 C55.37219489 244.52766853 58.9066521 244.4973034 62.44126892 244.45893669 C64.40841328 244.44192795 66.37567762 244.4412335 68.34289551 244.4410553 C78.32765812 244.33203678 89.0747449 243.73646684 97 237 C100.31664822 233.32479522 101.82430791 230.79205934 102.3125 225.8125 C101.76064493 219.0798682 99.05176538 214.69159103 94.25 210 C48.98791481 172.391991 -36.31881429 172.86071322 -92 169 C-92.859422 168.93941406 -93.71884399 168.87882813 -94.60430908 168.81640625 C-115.69653648 167.33894997 -136.73140259 166.82400202 -157.875 166.8125 C-158.97794403 166.81141235 -160.08088806 166.81032471 -161.21725464 166.8092041 C-164.32980533 166.80955406 -167.44216845 166.81857598 -170.5546875 166.83203125 C-171.49743027 166.83324478 -172.44017303 166.83445831 -173.41148376 166.83570862 C-177.53158682 166.44606969 -177.53158682 166.44606969 -181 168 Z "
          fill="#D3D3D3"
          transform="translate(697,82)"
        />
        <path
          d="M0 0 C-2.71105804 1.80737203 -4.57449072 2.6148925 -7.62890625 3.55859375 C-8.56798828 3.85604492 -9.50707031 4.15349609 -10.47460938 4.45996094 C-11.49361328 4.78254883 -12.51261719 5.10513672 -13.5625 5.4375 C-41.78171295 14.64164668 -68.7205175 27.47510042 -94 43 C-95 41 -95 41 -94.43359375 39.1875 C-85.86592828 20.37223465 -73.22502949 5.98349187 -53.640625 -1.78125 C-35.7824648 -7.75951822 -17.25451739 -7.87706229 0 0 Z "
          fill="#030303"
          transform="translate(697,82)"
        />
        <path
          d="M0 0 C0.33 0 0.66 0 1 0 C1.0093457 0.71317383 1.01869141 1.42634766 1.02832031 2.16113281 C1.70828384 43.69223871 13.36596822 82.68383003 43 113 C46.51390152 116.2280582 50.19011377 119.13176179 54 122 C54.886875 122.72445312 55.77375 123.44890625 56.6875 124.1953125 C82.07543665 144.43513977 113.71882023 152.69374679 145.81835938 149.74072266 C154.03389503 148.7814503 161.48052685 147.52753208 169 144 C169.46501834 140.68935532 169.46501834 140.68935532 169 137 C166.64578695 134.45201207 166.64578695 134.45201207 163.4375 132.5 C162.32807354 131.73168515 161.22128904 130.95954127 160.1171875 130.18359375 C159.08851563 129.46300781 158.05984375 128.74242187 157 128 C149.73337533 122.07470569 145.16159044 114.80899924 144.1875 105.375 C144.10454527 103.91768711 144.03415318 102.45927239 144 101 C143.34 101 142.68 101 142 101 C143.49396906 83.42913996 148.36384214 69.21006514 162.125 57.25 C175.91866117 46.61461159 191.72474596 41.57392871 209 41 C209 41.66 209 42.32 209 43 C208.09121094 43.08636719 207.18242188 43.17273438 206.24609375 43.26171875 C185.4476416 45.58687904 167.73239205 53.05072574 154.125 69.4375 C149.2779013 75.95364683 145.80063325 84.03799471 145.9375 92.25 C145.9684375 94.10625 145.9684375 94.10625 146 96 C146.94359375 95.31164062 146.94359375 95.31164062 147.90625 94.609375 C153.09343986 90.89084733 158.08836288 87.44619467 164 85 C166.2265625 85.40625 166.2265625 85.40625 168 86 C166.49759766 86.77923828 166.49759766 86.77923828 164.96484375 87.57421875 C155.12766868 92.71298124 155.12766868 92.71298124 146 99 C146.74263508 110.51084376 150.26197144 119.21521092 159 127 C161.83149229 128.96790625 164.69295863 130.77003464 167.6796875 132.4921875 C170 134 170 134 172 137 C172.66213077 143.06953203 172.66213077 143.06953203 170.515625 146.0859375 C167.02201724 148.74411731 163.63087476 149.35891489 159.375 150.1875 C158.5610376 150.35475586 157.7470752 150.52201172 156.90844727 150.69433594 C123.7127979 157.34076229 90.94270153 150.19025938 62.81640625 131.6328125 C29.3762667 108.87482172 8.63584057 75.24830063 0.3203125 35.7734375 C-1.56566728 24.74174758 -3.09692785 10.87709024 0 0 Z "
          fill="#E0E0E0"
          transform="translate(515,250)"
        />
        <path
          d="M0 0 C47.52 0 95.04 0 144 0 C143.875 55.6875 143.875 55.6875 143.75732422 73.20581055 C143.77050612 78.4334173 143.77050612 78.4334173 143.79690552 83.66096497 C143.80227107 85.97125702 143.78815716 88.28164852 143.75808716 90.5917511 C143.37998996 108.74885816 143.37998996 108.74885816 152.56193542 123.65142822 C153.76877739 124.81397125 153.76877739 124.81397125 155 126 C156.03836006 127.39981814 157.04866783 128.82225962 157.99609375 130.28515625 C158.4044043 130.90825684 158.81271484 131.53135742 159.23339844 132.17333984 C159.63075195 132.7967627 160.02810547 133.42018555 160.4375 134.0625 C160.8799707 134.7529541 161.32244141 135.4434082 161.77832031 136.15478516 C165.44457827 141.9607671 168.89088627 147.88682641 172.25 153.875 C172.74040771 154.73746338 173.23081543 155.59992676 173.73608398 156.48852539 C174.17895752 157.29410889 174.62183105 158.09969238 175.078125 158.9296875 C175.47418945 159.64366699 175.87025391 160.35764648 176.27832031 161.09326172 C177 163 177 163 176 166 C175.7097998 165.44352783 175.41959961 164.88705566 175.12060547 164.3137207 C166.21880885 147.35453241 156.12629032 131.57680644 145 116 C144.67 123.26 144.34 130.52 144 138 C141.36 138 138.72 138 136 138 C136.33 137.34 136.66 136.68 137 136 C138.65 136 140.3 136 142 136 C143.17193169 119.74486038 143.17193169 119.74486038 136.73535156 105.45166016 C134.2578993 102.8389821 131.67435339 100.41179415 129 98 C128.34 97.01 127.68 96.02 127 95 C130.36836489 96.45761081 132.56505752 98.3240226 135.125 100.9375 C135.80820313 101.62714844 136.49140625 102.31679687 137.1953125 103.02734375 C139 105 139 105 141 108 C141.495 55.53 141.495 55.53 142 2 C95.47 2 48.94 2 1 2 C0.67 1.34 0.34 0.68 0 0 Z "
          fill="#C2C2C2"
          transform="translate(1012,121)"
        />
        <path
          d="M0 0 C32.34 0 64.68 0 98 0 C98 30.69 98 61.38 98 93 C65.66 93 33.32 93 0 93 C0 62.31 0 31.62 0 0 Z M2 2 C2 31.37 2 60.74 2 91 C33.35 91 64.7 91 97 91 C97 61.63 97 32.26 97 2 C65.65 2 34.3 2 2 2 Z "
          fill="#BBBBBB"
          transform="translate(859,225)"
        />
        <path
          d="M0 0 C0.99 0.495 0.99 0.495 2 1 C2 45.22 2 89.44 2 135 C46.55 135 91.1 135 137 135 C136.67 135.66 136.34 136.32 136 137 C91.12 137 46.24 137 0 137 C0 91.79 0 46.58 0 0 Z "
          fill="#D5D5D5"
          transform="translate(1012,122)"
        />
        <path
          d="M0 0 C1.25541557 3.76624671 0.37061958 5.37188934 -1 9 C-0.34 9 0.32 9 1 9 C0 12 0 12 -2 13 C-4.81989511 22.89436881 -3.89431041 32.90879466 -3 43 C-3.99 43.495 -3.99 43.495 -5 44 C-5.91485343 38.56170463 -6.15225218 33.32198167 -6.125 27.8125 C-6.12886719 27.01908203 -6.13273438 26.22566406 -6.13671875 25.40820312 C-6.13542969 24.64056641 -6.13414062 23.87292969 -6.1328125 23.08203125 C-6.13168457 22.39343018 -6.13055664 21.7048291 -6.12939453 20.99536133 C-5.9931888 18.89496612 -5.56989107 17.02234931 -5 15 C-46.28879492 43.18326063 -76.26893655 82.63710813 -87 132 C-87.33 132 -87.66 132 -88 132 C-88.31513272 126.11489639 -87.23563174 121.29517833 -85.5 115.6875 C-85.23300293 114.81593262 -84.96600586 113.94436523 -84.69091797 113.04638672 C-78.41119831 93.22456458 -68.4763359 75.55356985 -56 59 C-55.3503125 58.1234375 -54.700625 57.246875 -54.03125 56.34375 C-41.38598925 40.0855576 -25.48104368 24.58580223 -7.69921875 14.04296875 C-4.42965529 11.56832086 -3.53477805 9.56469354 -2.125 5.75 C-1.71507812 4.67234375 -1.30515625 3.5946875 -0.8828125 2.484375 C-0.59148437 1.66453125 -0.30015625 0.8446875 0 0 Z "
          fill="#E3E3E3"
          transform="translate(604,115)"
        />
        <path
          d="M0 0 C46.86 0 93.72 0 142 0 C142 36.3 142 72.6 142 110 C141.01 110 140.02 110 139 110 C136.87890625 107.76953125 136.87890625 107.76953125 134.5625 104.8125 C133.80066406 103.84957031 133.03882813 102.88664062 132.25390625 101.89453125 C131.51011719 100.93933594 130.76632812 99.98414063 130 99 C128.6686104 97.33178021 127.3359295 95.66458641 126 94 C129.36836489 95.45761081 131.56505752 97.3240226 134.125 99.9375 C134.80820313 100.62714844 135.49140625 101.31679687 136.1953125 102.02734375 C138 104 138 104 140 107 C140.495 54.53 140.495 54.53 141 1 C94.47 1 47.94 1 0 1 C0 0.67 0 0.34 0 0 Z "
          fill="#868686"
          transform="translate(1013,122)"
        />
        <path
          d="M0 0 C0.495 0.99 0.495 0.99 1 2 C0.01200396 4.14016061 -1.06829772 6.23793743 -2.1875 8.3125 C-7.84028735 19.12848535 -11.17823342 30.10725797 -11.0625 42.375 C-11.05347656 43.62023437 -11.04445312 44.86546875 -11.03515625 46.1484375 C-11.02355469 47.08945313 -11.01195312 48.03046875 -11 49 C-10.36312256 49.06469482 -9.72624512 49.12938965 -9.07006836 49.19604492 C7.9339859 50.96745896 24.4231622 53.8257216 41 58 C41 58.66 41 59.32 41 60 C40.43039551 59.88462891 39.86079102 59.76925781 39.27392578 59.65039062 C13.76907498 54.49908021 13.76907498 54.49908021 -12 51 C-9.00820241 65.1313401 -9.00820241 65.1313401 -5 79 C-5.99 79.495 -5.99 79.495 -7 80 C-7.80454125 77.60787164 -8.59341551 75.21214002 -9.375 72.8125 C-9.59671875 72.15830078 -9.8184375 71.50410156 -10.046875 70.83007812 C-12.20517325 64.13300561 -12.88736106 58.23215308 -14 51 C-30.17 51 -46.34 51 -63 51 C-63 50.34 -63 49.68 -63 49 C-46.5 49 -30 49 -13 49 C-13 43.72 -13 38.44 -13 33 C-11.64498304 22.73039778 -7.57861957 7.57861957 0 0 Z "
          fill="#B5B5B5"
          transform="translate(251,182)"
        />
        <path
          d="M0 0 C0.33 0 0.66 0 1 0 C1.15520664 8.45926552 1.30335485 16.91861503 1.4429636 25.37815094 C1.50803007 29.30799539 1.57535411 33.23777179 1.64819336 37.16748047 C1.71865088 40.97349627 1.78271394 44.77957487 1.84269524 48.58576965 C1.86641575 50.02394896 1.89228185 51.46209484 1.92053413 52.90019226 C1.94048093 53.92575981 1.94048093 53.92575981 1.96083069 54.9720459 C1.97301667 55.56425682 1.98520266 56.15646774 1.99775791 56.76662445 C2.09180369 65.65927306 1.56074002 74.02815976 1 83 C-50.48 83 -101.96 83 -155 83 C-155 82.67 -155 82.34 -155 82 C-104.18 81.67 -53.36 81.34 -1 81 C0.29430046 68.34052547 0.29430046 68.34052547 -3 64 C-2.01 64 -1.02 64 0 64 C0 42.88 0 21.76 0 0 Z "
          fill="#D4D4D4"
          transform="translate(555,488)"
        />
        <path
          d="M0 0 C5.63021404 3.37812843 5.63021404 3.37812843 7.7265625 6.37890625 C8.19553955 7.04374023 8.6645166 7.70857422 9.14770508 8.39355469 C9.6352124 9.10930664 10.12271973 9.82505859 10.625 10.5625 C11.14280029 11.31047852 11.66060059 12.05845703 12.1940918 12.82910156 C17.79791982 21.01387514 23.00300142 29.43343153 28 38 C28.38655762 38.66177246 28.77311523 39.32354492 29.17138672 40.00537109 C33.61893697 47.69678581 33.61893697 47.69678581 35 51 C34.67 51.99 34.34 52.98 34 54 C33.7097998 53.44352783 33.41959961 52.88705566 33.12060547 52.3137207 C24.21880885 35.35453241 14.12629032 19.57680644 3 4 C2.67 11.26 2.34 18.52 2 26 C-0.64 26 -3.28 26 -6 26 C-5.67 25.34 -5.34 24.68 -5 24 C-3.35 24 -1.7 24 0 24 C0 16.08 0 8.16 0 0 Z "
          fill="#AEAEAE"
          transform="translate(1154,233)"
        />
        <path
          d="M0 0 C1.25541557 3.76624671 0.37061958 5.37188934 -1 9 C-0.34 9 0.32 9 1 9 C0 12 0 12 -2 13 C-4.81989511 22.89436881 -3.89431041 32.90879466 -3 43 C-3.99 43.495 -3.99 43.495 -5 44 C-5.91485343 38.56170463 -6.15225218 33.32198167 -6.125 27.8125 C-6.13080078 26.62237305 -6.13080078 26.62237305 -6.13671875 25.40820312 C-6.13542969 24.64056641 -6.13414062 23.87292969 -6.1328125 23.08203125 C-6.13168457 22.39343018 -6.13055664 21.7048291 -6.12939453 20.99536133 C-5.9931888 18.89496612 -5.56989107 17.02234931 -5 15 C-13.06917707 20.60136331 -20.84929737 26.22764142 -28 33 C-28.99 32.67 -29.98 32.34 -31 32 C-29.11089495 30.34587365 -27.21543166 28.70062676 -25.3125 27.0625 C-24.73177734 26.56032959 -24.15105469 26.05815918 -23.55273438 25.54077148 C-20.07635659 22.58875047 -16.56072497 20.01546485 -12.68701172 17.61474609 C-5.28414615 12.99732922 -2.3056681 8.35981503 0 0 Z "
          fill="#CBCBCB"
          transform="translate(604,115)"
        />
        <path
          d="M0 0 C12.01230177 5.75192228 22.285674 15.03095298 32 24 C35.21043882 22.61811547 37.04936365 21.07578097 39.25 18.375 C39.77078125 17.74335938 40.2915625 17.11171875 40.828125 16.4609375 C41.21484375 15.97882813 41.6015625 15.49671875 42 15 C42 20.43604556 37.59673482 24.20189278 34 28 C30.468169 30.88378861 26.80765339 33.4942281 23 36 C23 35.01 23 34.02 23 33 C28.34883721 28 28.34883721 28 31 28 C23.00012973 17.91565649 13.03632543 10.37144463 2.203125 3.59375 C1.47609375 3.0678125 0.7490625 2.541875 0 2 C0 1.34 0 0.68 0 0 Z "
          fill="#ABABAB"
          transform="translate(340,261)"
        />
        <path
          d="M0 0 C0 0.66 0 1.32 0 2 C-0.90878906 2.08636719 -1.81757812 2.17273438 -2.75390625 2.26171875 C-21.62416168 4.37131654 -37.27147019 10.59904899 -51 24 C-51.99 23.67 -52.98 23.34 -54 23 C-39.75290349 9.09962487 -20.42501064 -0.88804394 0 0 Z "
          fill="#D1D1D1"
          transform="translate(724,291)"
        />
        <path
          d="M0 0 C0.66 0.33 1.32 0.66 2 1 C1.54109375 1.58265625 1.0821875 2.1653125 0.609375 2.765625 C-5.80616266 11.33764591 -9.8350372 20.14451644 -9 31 C-8.3709375 30.54109375 -7.741875 30.0821875 -7.09375 29.609375 C-1.90656014 25.89084733 3.08836288 22.44619467 9 20 C11.2265625 20.40625 11.2265625 20.40625 13 21 C11.515 21.77923828 11.515 21.77923828 10 22.57421875 C3.18195493 26.17001931 -3.5401618 29.78133015 -10 34 C-11.80401362 32.19598638 -11.29972264 29.62822373 -11.375 27.1875 C-11.28105004 16.47720485 -6.86237888 8.01789973 0 0 Z "
          fill="#ECECEC"
          transform="translate(670,315)"
        />
        <path
          d="M0 0 C2 2 2 2 2 5 C-31.70817254 6.19388403 -31.70817254 6.19388403 -45 6 C-45 5.67 -45 5.34 -45 5 C-38.99878586 4.17344389 -33.05034006 3.71004792 -27 3.4375 C-26.09096924 3.3950415 -25.18193848 3.35258301 -24.24536133 3.30883789 C-16.15876686 2.95693898 -8.09312287 2.89697581 0 3 C0 2.01 0 1.02 0 0 Z "
          fill="#CDCDCD"
          transform="translate(515,245)"
        />
        <path
          d="M0 0 C2 2 2 2 2.22705078 4.43017578 C2.21134033 5.92266846 2.21134033 5.92266846 2.1953125 7.4453125 C2.18564453 9.05986328 2.18564453 9.05986328 2.17578125 10.70703125 C2.15902344 11.83496094 2.14226562 12.96289062 2.125 14.125 C2.11597656 15.26066406 2.10695313 16.39632812 2.09765625 17.56640625 C2.07403098 20.37781299 2.04109013 23.18880298 2 26 C-0.64 26 -3.28 26 -6 26 C-5.67 25.34 -5.34 24.68 -5 24 C-3.35 24 -1.7 24 0 24 C0 16.08 0 8.16 0 0 Z "
          fill="#BBBBBB"
          transform="translate(1154,233)"
        />
        <path
          d="M0 0 C0.66 0.33 1.32 0.66 2 1 C-2.08672164 5.91683698 -6.32334033 10.31963538 -11.19921875 14.45703125 C-13.2399921 16.20563314 -15.13921291 18.06168011 -17 20 C-15.56349127 15.57812117 -13.33322582 12.82846981 -10.1875 9.4375 C-9.33542969 8.50808594 -8.48335938 7.57867187 -7.60546875 6.62109375 C-5.19291124 4.19406813 -2.71786213 2.07377272 0 0 Z "
          fill="#787878"
          transform="translate(269,162)"
        />
        <path
          d="M0 0 C6.2449445 2.43309526 8.68097087 9.18207412 11.375 14.9375 C12.33395027 19.63635634 12.63933107 24.23475328 12 29 C10 31.6875 10 31.6875 8 33 C8.33 32.34 8.66 31.68 9 31 C11.6117752 23.16467439 9.53989605 16.2085156 6 9 C4.50088556 6.95242906 2.95349355 5.14351203 1.171875 3.33984375 C0 2 0 2 0 0 Z "
          fill="#D1D1D1"
          transform="translate(330,368)"
        />
        <path
          d="M0 0 C5.53870211 4.40578577 5.53870211 4.40578577 7.84375 7.375 C10.23388445 10.28472889 12.80892346 12.46664133 15.75 14.8125 C16.73484375 15.60269531 17.7196875 16.39289063 18.734375 17.20703125 C19.48203125 17.79871094 20.2296875 18.39039063 21 19 C20.34 19.66 19.68 20.32 19 21 C4.46124471 7.86335019 4.46124471 7.86335019 0 2 C0 1.34 0 0.68 0 0 Z "
          fill="#D7D7D7"
          transform="translate(548,353)"
        />
        <path
          d="M0 0 C0 5.43604556 -4.40326518 9.20189278 -8 13 C-11.531831 15.88378861 -15.19234661 18.4942281 -19 21 C-19 20.01 -19 19.02 -19 18 C-16.875 16.0546875 -16.875 16.0546875 -14 13.875 C-8.69721479 9.6972559 -4.28850472 5.19781517 0 0 Z "
          fill="#B3B3B3"
          transform="translate(382,276)"
        />
        <path
          d="M0 0 C0 0.99 0 1.98 0 3 C-2.58267413 4.45951119 -5.16610741 5.91764881 -7.75 7.375 C-8.84441406 7.99375 -8.84441406 7.99375 -9.9609375 8.625 C-10.66992188 9.02460937 -11.37890625 9.42421875 -12.109375 9.8359375 C-13.08342285 10.38580322 -13.08342285 10.38580322 -14.07714844 10.94677734 C-16.02837191 12.01554043 -18.00410556 13.01758503 -20 14 C-20.33 13.34 -20.66 12.68 -21 12 C-18.25128227 10.37282366 -15.50080454 8.74864561 -12.75 7.125 C-11.97269531 6.66480469 -11.19539062 6.20460938 -10.39453125 5.73046875 C-9.64042969 5.28574219 -8.88632812 4.84101562 -8.109375 4.3828125 C-7.41811523 3.97434082 -6.72685547 3.56586914 -6.01464844 3.14501953 C-4.04083698 2.02320958 -2.03979763 0.9959012 0 0 Z "
          fill="#ACACAC"
          transform="translate(626,111)"
        />
        <path
          d="M0 0 C-1.02480469 0.54269531 -2.04960938 1.08539063 -3.10546875 1.64453125 C-4.46618303 2.36711745 -5.82685804 3.08977762 -7.1875 3.8125 C-7.86103516 4.16892578 -8.53457031 4.52535156 -9.22851562 4.89257812 C-12.88162727 6.83496432 -16.47478512 8.83011045 -20 11 C-20 10.01 -20 9.02 -20 8 C-17.42474285 6.46382917 -14.841326 4.94611799 -12.25 3.4375 C-11.15558594 2.78104492 -11.15558594 2.78104492 -10.0390625 2.11132812 C-9.33007812 1.70205078 -8.62109375 1.29277344 -7.890625 0.87109375 C-6.91657715 0.29766235 -6.91657715 0.29766235 -5.92285156 -0.28735352 C-3.5589199 -1.16347293 -2.34057154 -0.82193222 0 0 Z "
          fill="#E9E9E9"
          transform="translate(683,336)"
        />
        <path
          d="M0 0 C0.66 0.33 1.32 0.66 2 1 C-3.37732923 8.02993632 -8.70380277 13.94613289 -16 19 C-16 16 -16 16 -14.0234375 13.984375 C-13.14945313 13.24703125 -12.27546875 12.5096875 -11.375 11.75 C-7.14444026 8.07830682 -3.51768033 4.35081515 0 0 Z "
          fill="#A4A4A4"
          transform="translate(726,181)"
        />
        <path
          d="M0 0 C0.33 0 0.66 0 1 0 C2.32 7.26 3.64 14.52 5 22 C4.34 22.33 3.68 22.66 3 23 C1.54815522 18.46298506 0.76490804 14.81938524 1 10 C0.34 10 -0.32 10 -1 10 C-0.67 6.7 -0.34 3.4 0 0 Z "
          fill="#DADADA"
          transform="translate(658,341)"
        />
        <path
          d="M0 0 C5.50719921 3.90510489 10.35827355 8.09717644 15 13 C14.34 13.66 13.68 14.32 13 15 C10.82722286 12.88094537 8.66173092 10.75527122 6.5 8.625 C5.87996094 8.02171875 5.25992187 7.4184375 4.62109375 6.796875 C4.03457031 6.21679688 3.44804688 5.63671875 2.84375 5.0390625 C2.29912109 4.50490723 1.75449219 3.97075195 1.19335938 3.42041016 C0 2 0 2 0 0 Z "
          fill="#B2B2B2"
          transform="translate(1125,201)"
        />
        <path
          d="M0 0 C6.24269443 2.72332308 12.24918254 8.76481375 15 15 C14.67 15.66 14.34 16.32 14 17 C12.03963533 14.73089288 10.08164784 12.45980842 8.125 10.1875 C7.56941406 9.54490234 7.01382812 8.90230469 6.44140625 8.24023438 C5.90644531 7.61826172 5.37148437 6.99628906 4.8203125 6.35546875 C4.32805176 5.78465576 3.83579102 5.21384277 3.32861328 4.62573242 C2 3 2 3 0 0 Z "
          fill="#AEAEAE"
          transform="translate(1139,216)"
        />
        <path
          d="M0 0 C2 2 2 2 2 5 C-0.4377963 5.05397335 -2.87439685 5.09365616 -5.3125 5.125 C-6.34793945 5.15013672 -6.34793945 5.15013672 -7.40429688 5.17578125 C-11.17135396 5.21217794 -12.78431704 5.14378864 -16 3 C-10.72 3 -5.44 3 0 3 C0 2.01 0 1.02 0 0 Z "
          fill="#B4B4B4"
          transform="translate(515,245)"
        />
        <path
          d="M0 0 C3.88397689 1.55002747 6.02979619 4.00476621 8.75 7.125 C9.94882812 8.49011719 9.94882812 8.49011719 11.171875 9.8828125 C12.07679688 10.93082031 12.07679688 10.93082031 13 12 C12.67 12.66 12.34 13.32 12 14 C10.36884105 12.42301238 8.74528667 10.83815634 7.125 9.25 C6.22007812 8.36828125 5.31515625 7.4865625 4.3828125 6.578125 C2.35457004 4.38363316 1.11119587 2.7332864 0 0 Z "
          fill="#B0B0B0"
          transform="translate(610,182)"
        />
        <path
          d="M0 0 C3.23861303 1.44424635 5.61969163 3.25772247 8.25 5.625 C8.95640625 6.25664062 9.6628125 6.88828125 10.390625 7.5390625 C10.92171875 8.02117187 11.4528125 8.50328125 12 9 C11.34 9.66 10.68 10.32 10 11 C8.33035479 9.35718838 6.6643536 7.71067239 5 6.0625 C4.071875 5.14597656 3.14375 4.22945313 2.1875 3.28515625 C0 1 0 1 0 0 Z "
          fill="#9C9C9C"
          transform="translate(361,277)"
        />
        <path
          d="M0 0 C3.9115468 1.47958509 5.2274524 3.53957471 7.25 7.125 C8.03117187 8.49011719 8.03117187 8.49011719 8.828125 9.8828125 C9.40820312 10.93082031 9.40820312 10.93082031 10 12 C9.01 12.495 9.01 12.495 8 13 C7.03874097 11.58531689 6.08111675 10.1681636 5.125 8.75 C4.32449219 7.56664062 4.32449219 7.56664062 3.5078125 6.359375 C2.18177985 4.28444308 1.05071825 2.22385028 0 0 Z "
          fill="#C7C7C7"
          transform="translate(330,368)"
        />
        <path
          d="M0 0 C0.99 0.495 0.99 0.495 2 1 C2 3.31 2 5.62 2 8 C2.99 8 3.98 8 5 8 C5 8.66 5 9.32 5 10 C3.35 10 1.7 10 0 10 C0 6.7 0 3.4 0 0 Z "
          fill="#CECECE"
          transform="translate(1012,249)"
        />
        <path
          d="M0 0 C0.66 0.33 1.32 0.66 2 1 C-0.64 3.64 -3.28 6.28 -6 9 C-6.99 8.67 -7.98 8.34 -9 8 C-6.03 5.36 -3.06 2.72 0 0 Z "
          fill="#D5D5D5"
          transform="translate(679,306)"
        />
        <path
          d="M0 0 C1.25541557 3.76624671 0.37061958 5.37188934 -1 9 C-0.34 9 0.32 9 1 9 C0.67 9.99 0.34 10.98 0 12 C-1.32 11.34 -2.64 10.68 -4 10 C-2.68 6.7 -1.36 3.4 0 0 Z "
          fill="#BEBEBE"
          transform="translate(604,115)"
        />
        <path
          d="M0 0 C4.455 2.97 4.455 2.97 9 6 C8.34 6.66 7.68 7.32 7 8 C4.36 6.02 1.72 4.04 -1 2 C-0.67 1.34 -0.34 0.68 0 0 Z "
          fill="#A2A2A2"
          transform="translate(1098,179)"
        />
        <path
          d="M0 0 C2.64 1.98 5.28 3.96 8 6 C7.34 6.66 6.68 7.32 6 8 C4.99403703 7.0479279 3.99538437 6.08812654 3 5.125 C2.443125 4.59132812 1.88625 4.05765625 1.3125 3.5078125 C0 2 0 2 0 0 Z "
          fill="#A6A6A6"
          transform="translate(1117,194)"
        />
        <path
          d="M0 0 C0 0.66 0 1.32 0 2 C-2.31 3.32 -4.62 4.64 -7 6 C-7 5.01 -7 4.02 -7 3 C-2.77777778 0 -2.77777778 0 0 0 Z "
          fill="#DBDBDB"
          transform="translate(670,341)"
        />
        <path
          d="M0 0 C-1 3 -1 3 -4.0625 4.6875 C-5.031875 5.120625 -6.00125 5.55375 -7 6 C-7.33 5.34 -7.66 4.68 -8 4 C-2.25 0 -2.25 0 0 0 Z "
          fill="#D3D3D3"
          transform="translate(613,119)"
        />
      </svg>

      <div className="relative z-10 flex items-center justify-center h-full">
        <Link className="bg-white font-bold text-black p-2.5 flex flex-col items-center justify-center" href="/supporter">
          <span className="font-bold md:text-lg">Become a supporter</span>
          <span className="font-light text-xs md:text-sm">Tap for more</span>
        </Link>
      </div>
    </div>
  );
}
