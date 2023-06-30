import * as React from "react";
import Svg, { Rect, Path, Circle } from "react-native-svg";

function AddTaskGroup(props: any) {
  return (
    <Svg width={345} height={253} fill="none" viewBox="0 0 345 253" {...props}>
      <Rect
        width={344.5}
        height={39.5}
        x={0.25}
        y={0.25}
        stroke="#968EB0"
        rx={19.75}
      />
      <Path
        fill="#444"
        d="M19.676 15.912v-1.094h7.637v1.094H24.11V25h-1.233v-9.088h-3.202zm10.588 9.267c-.483 0-.923-.091-1.317-.273a2.26 2.26 0 01-.94-.8c-.232-.352-.348-.777-.348-1.274 0-.437.086-.792.259-1.064.172-.275.402-.49.69-.646a3.64 3.64 0 01.955-.348c.352-.08.705-.142 1.06-.189.463-.06.84-.104 1.128-.134.292-.033.504-.088.636-.164.136-.076.204-.209.204-.398v-.04c0-.49-.134-.871-.403-1.143-.265-.272-.668-.408-1.208-.408-.56 0-.999.123-1.317.368-.318.245-.542.507-.671.786l-1.114-.398c.199-.464.464-.825.796-1.084a2.977 2.977 0 011.093-.547 4.54 4.54 0 011.174-.159c.245 0 .527.03.845.09.321.056.631.174.93.353.301.179.551.449.75.81.199.361.298.845.298 1.452V25h-1.173v-1.034h-.06c-.08.166-.212.343-.397.532-.186.189-.433.35-.741.482-.308.133-.684.199-1.129.199zm.18-1.054c.463 0 .855-.091 1.173-.273a1.862 1.862 0 00.974-1.616v-1.074c-.05.06-.159.114-.328.164a5.553 5.553 0 01-.577.124 26.415 26.415 0 01-1.123.15c-.305.04-.59.104-.855.193a1.474 1.474 0 00-.637.393c-.159.172-.238.408-.238.706 0 .408.15.716.452.925.305.205.691.308 1.158.308zm10.871-5.051l-1.054.298a1.959 1.959 0 00-.293-.512 1.423 1.423 0 00-.517-.418c-.22-.109-.5-.164-.84-.164-.468 0-.857.108-1.169.324-.308.212-.462.482-.462.81 0 .292.106.522.318.691.212.169.544.31.994.423l1.134.278c.682.166 1.191.42 1.526.76.335.339.502.774.502 1.308 0 .438-.126.829-.378 1.174-.248.344-.596.616-1.044.815-.447.199-.967.298-1.56.298-.78 0-1.424-.169-1.935-.507-.51-.338-.833-.832-.97-1.482l1.114-.278c.107.411.307.72.602.925.298.205.688.308 1.168.308.547 0 .981-.116 1.303-.348.325-.235.487-.517.487-.845a.888.888 0 00-.278-.666c-.186-.183-.47-.319-.855-.408l-1.273-.298c-.7-.166-1.213-.423-1.541-.77-.325-.352-.487-.791-.487-1.318 0-.431.12-.812.362-1.144a2.47 2.47 0 011-.78 3.509 3.509 0 011.441-.284c.756 0 1.35.166 1.78.497.434.332.743.77.925 1.313zm3 3.142l-.02-1.452h.238l3.34-3.4h1.453l-3.56 3.6h-.1l-1.352 1.252zM43.22 25V14.818h1.174V25H43.22zm4.853 0l-2.983-3.778.835-.816L49.565 25h-1.492zm14.933-10.182V25h-1.193l-5.548-7.994h-.1V25h-1.233V14.818h1.193l5.569 8.014h.099v-8.014h1.213zm4.555 10.361c-.484 0-.923-.091-1.317-.273a2.26 2.26 0 01-.94-.8c-.232-.352-.348-.777-.348-1.274 0-.437.086-.792.259-1.064.172-.275.402-.49.69-.646a3.64 3.64 0 01.955-.348c.352-.08.705-.142 1.06-.189.463-.06.84-.104 1.128-.134.291-.033.504-.088.636-.164.136-.076.204-.209.204-.398v-.04c0-.49-.134-.871-.403-1.143-.265-.272-.668-.408-1.208-.408-.56 0-1 .123-1.317.368-.319.245-.542.507-.671.786l-1.114-.398c.199-.464.464-.825.795-1.084a2.98 2.98 0 011.094-.547 4.54 4.54 0 011.173-.159c.246 0 .527.03.846.09.321.056.631.174.93.353.3.179.551.449.75.81.199.361.298.845.298 1.452V25h-1.173v-1.034h-.06c-.08.166-.212.343-.397.532-.186.189-.433.35-.741.482-.308.133-.685.199-1.129.199zm.18-1.054c.463 0 .854-.091 1.172-.273a1.862 1.862 0 00.975-1.616v-1.074c-.05.06-.16.114-.328.164a5.542 5.542 0 01-.577.124 26.343 26.343 0 01-1.123.15 4.56 4.56 0 00-.856.193 1.474 1.474 0 00-.636.393c-.159.172-.239.408-.239.706 0 .408.151.716.453.925.305.205.69.308 1.158.308zm5.462.875v-7.636h1.133v1.193h.1a1.92 1.92 0 01.77-.95c.355-.228.78-.343 1.278-.343.504 0 .923.115 1.258.343.338.226.601.542.79.95h.08a2.22 2.22 0 01.88-.94c.39-.235.86-.353 1.407-.353.683 0 1.241.214 1.675.642.434.424.651 1.085.651 1.983V25h-1.173v-5.11c0-.564-.154-.967-.462-1.209a1.711 1.711 0 00-1.089-.363c-.537 0-.953.163-1.248.487-.295.322-.442.73-.442 1.223V25h-1.194v-5.23c0-.434-.14-.784-.422-1.05-.282-.268-.645-.402-1.089-.402-.305 0-.59.081-.855.244a1.84 1.84 0 00-.636.676c-.16.285-.239.615-.239.99V25h-1.173zm15.37.16c-.736 0-1.371-.163-1.905-.488A3.27 3.27 0 0185.44 23.3c-.285-.59-.427-1.276-.427-2.059 0-.782.142-1.471.427-2.068.289-.6.69-1.067 1.204-1.402.516-.338 1.12-.507 1.81-.507.397 0 .79.067 1.177.2.388.132.741.347 1.06.645.317.295.571.686.76 1.174.189.487.283 1.087.283 1.8v.497h-5.886v-1.015h4.693c0-.43-.086-.815-.258-1.153a1.95 1.95 0 00-.726-.8c-.312-.196-.68-.294-1.104-.294-.467 0-.872.116-1.213.348a2.29 2.29 0 00-.78.895 2.629 2.629 0 00-.274 1.183v.677c0 .576.1 1.065.298 1.466.203.398.483.701.84.91.359.205.775.308 1.248.308.309 0 .587-.043.836-.13.252-.089.469-.221.65-.397.183-.179.324-.4.423-.666l1.134.318a2.51 2.51 0 01-.602 1.014 2.93 2.93 0 01-1.044.677c-.414.159-.88.238-1.397.238z"
      />
      <Rect
        width={344.5}
        height={39.5}
        x={0.25}
        y={49.25}
        stroke="#968EB0"
        rx={19.75}
      />
      <Path
        fill="#444"
        d="M20.233 74V63.818h6.105v1.094h-4.872v3.44h4.415v1.094h-4.415V74h-1.233zm7.976 0v-7.636h1.133v1.153h.08c.139-.378.39-.684.755-.92a2.224 2.224 0 011.233-.353c.087 0 .194.002.323.005.13.004.227.009.294.015v1.193a3.667 3.667 0 00-.274-.044 2.691 2.691 0 00-.442-.035c-.371 0-.703.078-.994.234a1.762 1.762 0 00-.686.636 1.715 1.715 0 00-.25.92V74H28.21zm8.178.16c-.736 0-1.37-.163-1.904-.488a3.27 3.27 0 01-1.228-1.372c-.285-.59-.428-1.276-.428-2.058 0-.783.143-1.472.428-2.069.288-.6.69-1.067 1.203-1.402.517-.338 1.12-.507 1.81-.507.397 0 .79.067 1.178.2.388.132.74.347 1.059.645.318.295.572.687.76 1.174.19.487.284 1.087.284 1.8v.496h-5.886v-1.014h4.693c0-.43-.087-.815-.259-1.153a1.949 1.949 0 00-.726-.8c-.311-.196-.68-.294-1.103-.294-.468 0-.872.116-1.214.348a2.289 2.289 0 00-.78.895 2.629 2.629 0 00-.273 1.183v.677c0 .576.099 1.065.298 1.466.202.398.482.701.84.91.358.205.774.308 1.248.308.308 0 .587-.043.835-.13.252-.089.47-.221.651-.397.183-.179.324-.4.423-.666l1.133.318c-.119.385-.32.723-.601 1.014-.282.289-.63.514-1.044.677-.414.158-.88.238-1.397.238zm10.157 2.704v-4.037h-.1a7.456 7.456 0 01-.367.527c-.16.209-.387.396-.682.561-.295.163-.687.244-1.178.244-.636 0-1.198-.16-1.685-.482-.487-.325-.869-.782-1.144-1.372-.275-.594-.412-1.295-.412-2.103 0-.802.137-1.498.412-2.088.275-.59.658-1.046 1.149-1.368.49-.321 1.057-.482 1.7-.482.497 0 .89.083 1.178.249.292.162.514.348.666.557.156.205.277.374.363.507h.14v-1.213h1.133v10.5h-1.173zm-2.168-3.759c.47 0 .869-.123 1.193-.368.325-.248.572-.591.741-1.029.17-.44.254-.95.254-1.526 0-.57-.083-1.07-.249-1.497-.166-.43-.41-.765-.736-1.004-.324-.242-.726-.363-1.203-.363-.497 0-.911.128-1.243.383a2.291 2.291 0 00-.74 1.03c-.163.43-.244.914-.244 1.45 0 .544.083 1.038.248 1.482.17.441.418.793.746 1.054.332.259.743.388 1.233.388zm10.301-2.227v-4.514h1.174V74h-1.174v-1.293h-.08a2.504 2.504 0 01-.834.99c-.378.268-.855.402-1.432.402a2.55 2.55 0 01-1.273-.313 2.191 2.191 0 01-.875-.954c-.212-.428-.318-.966-.318-1.616v-4.852h1.173v4.772c0 .557.156 1.001.468 1.333.314.331.715.497 1.203.497.291 0 .588-.075.89-.224.305-.149.56-.378.765-.686.209-.308.313-.7.313-1.178zm6.524 3.281c-.735 0-1.37-.162-1.904-.487A3.27 3.27 0 0158.07 72.3c-.285-.59-.427-1.276-.427-2.058 0-.783.142-1.472.427-2.069.289-.6.69-1.067 1.203-1.402.517-.338 1.12-.507 1.81-.507.398 0 .79.067 1.178.2.388.132.741.347 1.06.645.317.295.571.687.76 1.174.189.487.283 1.087.283 1.8v.496h-5.886v-1.014h4.693c0-.43-.086-.815-.258-1.153a1.95 1.95 0 00-.726-.8c-.312-.196-.68-.294-1.104-.294-.467 0-.872.116-1.213.348a2.29 2.29 0 00-.78.895 2.629 2.629 0 00-.274 1.183v.677c0 .576.1 1.065.298 1.466.203.398.483.701.84.91.358.205.774.308 1.248.308.309 0 .587-.043.836-.13.252-.089.469-.221.65-.397.183-.179.324-.4.423-.666l1.134.318a2.51 2.51 0 01-.602 1.014 2.93 2.93 0 01-1.044.677c-.414.158-.88.238-1.397.238zm6.12-4.753V74h-1.173v-7.636h1.134v1.193h.099c.179-.388.45-.7.815-.935.365-.239.836-.358 1.412-.358.517 0 .97.106 1.358.318.387.21.689.527.904.955.216.424.323.961.323 1.61V74H71.02v-4.773c0-.6-.155-1.067-.467-1.402-.312-.338-.74-.507-1.283-.507-.374 0-.709.081-1.004.244-.292.162-.522.4-.691.71-.17.312-.254.69-.254 1.134zM77.44 74.16c-.716 0-1.333-.169-1.85-.507a3.305 3.305 0 01-1.193-1.397c-.278-.593-.417-1.271-.417-2.033 0-.776.142-1.46.427-2.054a3.38 3.38 0 011.203-1.397c.517-.338 1.12-.507 1.81-.507.537 0 1.02.1 1.452.299.43.198.784.477 1.059.835.275.358.445.775.512 1.253h-1.174a1.822 1.822 0 00-.596-.925c-.305-.272-.716-.408-1.233-.408-.458 0-.859.12-1.203.358-.342.236-.608.569-.8 1-.19.427-.284.93-.284 1.506 0 .59.093 1.103.278 1.541.19.438.454.777.796 1.02.344.241.749.362 1.213.362.305 0 .582-.053.83-.159.249-.106.46-.258.632-.457.172-.2.294-.438.367-.716h1.174a2.73 2.73 0 01-.492 1.218 2.751 2.751 0 01-1.03.855c-.424.209-.918.313-1.481.313zm5.474 2.705c-.2 0-.377-.017-.532-.05a1.4 1.4 0 01-.324-.09l.299-1.034c.285.073.537.1.755.08a.906.906 0 00.582-.293c.172-.173.33-.453.472-.84l.22-.597-2.825-7.676h1.273l2.108 6.085h.08l2.107-6.085h1.273l-3.241 8.75a3.31 3.31 0 01-.542.979 2.03 2.03 0 01-.75.582 2.32 2.32 0 01-.956.189z"
      />
      <Rect
        width={344.5}
        height={39.5}
        x={0.25}
        y={98.25}
        stroke="#968EB0"
        rx={19.75}
      />
      <Path
        fill="#444"
        d="M25.801 115.364a1.563 1.563 0 00-.726-1.174c-.424-.278-.944-.417-1.56-.417-.452 0-.846.073-1.184.218a1.893 1.893 0 00-.785.602 1.44 1.44 0 00-.279.87c0 .272.065.506.194.701.133.192.302.353.507.482.206.126.421.231.646.314.226.079.433.144.622.193l1.034.279c.265.069.56.166.885.288.328.123.641.29.94.502.301.209.55.478.745.806.196.328.294.731.294 1.208 0 .55-.145 1.047-.433 1.491-.285.444-.703.797-1.253 1.059-.547.262-1.211.393-1.994.393-.729 0-1.36-.118-1.894-.353-.53-.235-.947-.563-1.252-.984a2.809 2.809 0 01-.512-1.467h1.272c.033.384.163.703.388.955a2.1 2.1 0 00.865.556c.351.12.73.179 1.133.179.471 0 .894-.076 1.268-.228a2.18 2.18 0 00.89-.647 1.53 1.53 0 00.328-.974c0-.338-.094-.613-.283-.825a2.074 2.074 0 00-.746-.517 7.702 7.702 0 00-1-.348l-1.252-.358c-.795-.229-1.425-.556-1.89-.98-.463-.424-.695-.979-.695-1.665 0-.57.154-1.068.462-1.492a3.08 3.08 0 011.253-.994 4.225 4.225 0 011.765-.358c.656 0 1.24.118 1.75.353.51.232.915.55 1.213.955.302.404.46.863.477 1.377h-1.193zm4.374 3.042V123h-1.173v-10.182h1.173v3.739h.1c.178-.395.447-.708.805-.94.361-.235.842-.353 1.442-.353.52 0 .976.105 1.367.313.39.206.694.522.91.95.218.424.328.964.328 1.621V123h-1.174v-4.773c0-.606-.157-1.075-.472-1.407-.312-.334-.744-.502-1.298-.502a2.16 2.16 0 00-1.034.244c-.301.162-.54.399-.716.711-.172.311-.258.689-.258 1.133zm9.345 4.773c-.484 0-.923-.091-1.317-.273a2.265 2.265 0 01-.94-.801c-.232-.351-.348-.775-.348-1.273 0-.437.086-.792.259-1.064.172-.275.402-.49.69-.646a3.64 3.64 0 01.955-.348c.352-.079.705-.142 1.06-.189.463-.059.84-.104 1.128-.134.291-.033.504-.088.636-.164.136-.076.204-.209.204-.398v-.04c0-.49-.134-.871-.403-1.143-.265-.272-.668-.408-1.208-.408-.56 0-1 .123-1.317.368-.319.245-.542.507-.671.786l-1.114-.398c.199-.464.464-.825.795-1.084.335-.262.7-.444 1.094-.547a4.543 4.543 0 011.173-.159c.246 0 .527.03.846.09.321.056.63.174.93.353.3.179.551.449.75.81.199.361.298.845.298 1.452V123h-1.173v-1.034h-.06c-.08.166-.212.343-.397.532-.186.189-.433.35-.741.482-.308.133-.685.199-1.129.199zm.18-1.054c.463 0 .854-.091 1.172-.273a1.863 1.863 0 00.975-1.616v-1.074c-.05.06-.16.114-.328.164a5.521 5.521 0 01-.577.124c-.215.033-.426.063-.631.09-.203.023-.367.043-.492.059a4.56 4.56 0 00-.856.194 1.47 1.47 0 00-.636.393c-.159.172-.239.408-.239.706 0 .408.151.716.453.925.305.205.69.308 1.158.308zm5.462.875v-7.636h1.133v1.153h.08c.139-.378.39-.684.755-.92a2.227 2.227 0 011.233-.353c.087 0 .194.002.324.005.129.004.227.009.293.015v1.193a3.65 3.65 0 00-.273-.044 2.606 2.606 0 00-.443-.035c-.371 0-.703.078-.994.234a1.758 1.758 0 00-.686.636 1.714 1.714 0 00-.249.92V123h-1.173zm8.178.159c-.736 0-1.37-.162-1.904-.487a3.273 3.273 0 01-1.228-1.372c-.285-.59-.428-1.276-.428-2.059 0-.782.143-1.471.428-2.068.288-.6.69-1.067 1.203-1.402.517-.338 1.12-.507 1.81-.507.397 0 .79.066 1.178.199.388.133.74.348 1.059.646.318.295.572.686.76 1.174.19.487.284 1.087.284 1.799v.498h-5.886v-1.015h4.693a2.5 2.5 0 00-.259-1.153 1.943 1.943 0 00-.726-.8c-.311-.196-.68-.294-1.103-.294-.468 0-.872.116-1.213.348a2.291 2.291 0 00-.78.895 2.628 2.628 0 00-.274 1.183v.676c0 .577.1 1.066.298 1.467.202.398.482.701.84.91.358.205.774.308 1.248.308.308 0 .587-.043.835-.129a1.79 1.79 0 00.652-.398c.182-.179.323-.401.422-.666l1.134.318a2.51 2.51 0 01-.602 1.014c-.282.289-.63.514-1.044.676-.414.16-.88.239-1.397.239zM64.233 123l-2.784-10.182h1.253l2.127 8.293h.1l2.167-8.293h1.392l2.168 8.293h.1l2.127-8.293h1.253L71.352 123H70.08l-2.247-8.114h-.08L65.507 123h-1.273zm11.28 0v-7.636h1.174V123h-1.174zm.597-8.909a.833.833 0 01-.592-.234.751.751 0 01-.243-.562c0-.218.08-.406.243-.561a.833.833 0 01.592-.234c.229 0 .424.078.587.234a.742.742 0 01.248.561.744.744 0 01-.248.562.817.817 0 01-.587.234zm6.047 1.273v.994h-3.958v-.994h3.958zm-2.804-1.83h1.173v7.278c0 .332.048.581.144.746.1.163.225.272.378.328.156.053.32.08.492.08.13 0 .235-.007.318-.02l.2-.04.238 1.054c-.08.03-.19.06-.333.09a2.466 2.466 0 01-.542.049c-.332 0-.656-.071-.975-.213a1.938 1.938 0 01-.785-.652c-.206-.291-.308-.659-.308-1.103v-7.597zm5.906 4.872V123h-1.173v-10.182h1.173v3.739h.1c.178-.395.447-.708.805-.94.361-.235.842-.353 1.442-.353.52 0 .976.105 1.367.313.39.206.694.522.91.95.218.424.328.964.328 1.621V123h-1.174v-4.773c0-.606-.157-1.075-.472-1.407-.312-.334-.744-.502-1.298-.502a2.16 2.16 0 00-1.034.244c-.301.162-.54.399-.716.711-.172.311-.258.689-.258 1.133zm10.32-5.588h1.412l2.823 4.753h.12l2.824-4.753h1.412l-3.679 5.986V123h-1.233v-4.196l-3.68-5.986zm12.048 10.341c-.689 0-1.294-.164-1.814-.492a3.338 3.338 0 01-1.213-1.377c-.289-.59-.433-1.28-.433-2.068 0-.796.144-1.49.433-2.084a3.34 3.34 0 011.213-1.382c.52-.328 1.125-.492 1.814-.492.69 0 1.293.164 1.81.492.52.329.925.789 1.213 1.382.292.594.438 1.288.438 2.084 0 .788-.146 1.478-.438 2.068a3.296 3.296 0 01-1.213 1.377c-.517.328-1.12.492-1.81.492zm0-1.054c.524 0 .955-.134 1.293-.403.338-.268.588-.621.751-1.059.162-.437.243-.911.243-1.421 0-.511-.081-.986-.243-1.427a2.411 2.411 0 00-.751-1.069c-.338-.272-.769-.408-1.293-.408-.523 0-.954.136-1.292.408a2.403 2.403 0 00-.751 1.069 4.104 4.104 0 00-.244 1.427c0 .51.082.984.244 1.421.162.438.413.791.751 1.059.338.269.769.403 1.292.403zm10.064-2.227v-4.514h1.173V123h-1.173v-1.293h-.079a2.508 2.508 0 01-.836.99c-.378.268-.855.402-1.432.402-.477 0-.901-.104-1.272-.313a2.192 2.192 0 01-.875-.954c-.212-.428-.318-.966-.318-1.616v-4.852h1.173v4.772c0 .557.156 1.001.467 1.333.315.331.716.497 1.203.497.292 0 .589-.075.89-.224.305-.149.56-.378.766-.686.209-.308.313-.701.313-1.178zm3.322 3.122v-7.636h1.134v1.153h.079a1.84 1.84 0 01.756-.92 2.229 2.229 0 011.233-.353c.086 0 .194.002.323.005.129.004.227.009.293.015v1.193a3.514 3.514 0 00-.273-.044 2.605 2.605 0 00-.442-.035c-.372 0-.703.078-.995.234a1.711 1.711 0 00-.934 1.556V123h-1.174zm9.306 0v-10.182h6.105v1.094h-4.872v3.44h4.415v1.094h-4.415V123h-1.233zm7.976 0v-7.636h1.133v1.153h.08c.139-.378.391-.684.755-.92a2.229 2.229 0 011.233-.353c.086 0 .194.002.323.005.13.004.227.009.294.015v1.193a3.667 3.667 0 00-.274-.044 2.597 2.597 0 00-.442-.035c-.371 0-.703.078-.994.234a1.755 1.755 0 00-.687.636 1.72 1.72 0 00-.248.92V123h-1.173zm5.209 0v-7.636h1.173V123h-1.173zm.596-8.909a.83.83 0 01-.591-.234.75.75 0 01-.244-.562c0-.218.081-.406.244-.561a.83.83 0 01.591-.234c.229 0 .424.078.587.234a.74.74 0 01.248.561.743.743 0 01-.248.562.818.818 0 01-.587.234zm5.928 9.068c-.736 0-1.371-.162-1.905-.487a3.28 3.28 0 01-1.228-1.372c-.285-.59-.427-1.276-.427-2.059 0-.782.142-1.471.427-2.068.289-.6.69-1.067 1.204-1.402.517-.338 1.12-.507 1.809-.507.398 0 .791.066 1.178.199.388.133.741.348 1.059.646.319.295.572.686.761 1.174.189.487.283 1.087.283 1.799v.498h-5.886v-1.015h4.693c0-.431-.086-.815-.258-1.153a1.943 1.943 0 00-.726-.8c-.312-.196-.68-.294-1.104-.294-.467 0-.871.116-1.213.348a2.288 2.288 0 00-.78.895 2.62 2.62 0 00-.274 1.183v.676c0 .577.1 1.066.298 1.467.203.398.483.701.841.91.358.205.774.308 1.248.308.308 0 .586-.043.835-.129.252-.09.469-.222.651-.398a1.82 1.82 0 00.423-.666l1.133.318c-.119.385-.32.723-.601 1.014-.282.289-.63.514-1.044.676-.415.16-.88.239-1.397.239zm6.12-4.753V123h-1.174v-7.636h1.134v1.193h.099c.179-.388.451-.7.816-.935.364-.238.835-.358 1.411-.358.518 0 .97.106 1.358.318.388.209.689.527.905.955.215.424.323.961.323 1.611V123h-1.174v-4.773c0-.6-.155-1.067-.467-1.402-.311-.338-.739-.507-1.283-.507-.374 0-.709.081-1.004.244a1.736 1.736 0 00-.691.711c-.169.311-.253.689-.253 1.133zm9.899 4.753c-.636 0-1.198-.161-1.685-.482-.487-.325-.869-.782-1.144-1.372-.275-.594-.412-1.295-.412-2.103 0-.802.137-1.498.412-2.088.275-.59.658-1.046 1.149-1.368.49-.321 1.057-.482 1.7-.482.497 0 .89.083 1.178.249.292.162.514.348.667.557.155.205.276.374.363.507h.099v-3.759h1.173V123h-1.133v-1.173h-.139a7.881 7.881 0 01-.368.527 2.187 2.187 0 01-.682.561c-.294.163-.687.244-1.178.244zm.159-1.054c.471 0 .869-.123 1.194-.368.324-.248.571-.591.74-1.029.169-.441.254-.949.254-1.526 0-.57-.083-1.069-.249-1.497-.165-.431-.411-.765-.736-1.004-.324-.242-.725-.363-1.203-.363-.497 0-.911.128-1.243.383a2.287 2.287 0 00-.74 1.029 4.08 4.08 0 00-.244 1.452c0 .543.083 1.037.249 1.481.169.441.417.792.745 1.054.332.259.743.388 1.233.388zm11.062-5.031l-1.054.298a1.954 1.954 0 00-.293-.512 1.43 1.43 0 00-.517-.418c-.219-.109-.499-.164-.84-.164-.468 0-.857.108-1.169.324-.308.212-.462.482-.462.81 0 .292.106.522.318.691.212.169.544.31.994.423l1.134.278c.683.166 1.191.419 1.526.761.335.338.502.774.502 1.307 0 .438-.126.829-.378 1.173-.248.345-.596.617-1.044.816-.447.199-.967.298-1.561.298-.779 0-1.423-.169-1.934-.507-.51-.338-.833-.832-.969-1.482l1.114-.278c.106.411.306.719.601.925.298.205.688.308 1.168.308.547 0 .982-.116 1.303-.348.325-.235.487-.517.487-.845a.89.89 0 00-.278-.666c-.186-.183-.471-.319-.855-.408l-1.273-.298c-.699-.166-1.213-.423-1.541-.771-.325-.351-.487-.79-.487-1.317 0-.431.121-.812.363-1.144a2.47 2.47 0 01.999-.78 3.508 3.508 0 011.442-.284c.755 0 1.349.166 1.779.497.435.332.743.769.925 1.313z"
      />
      <Rect
        width={344.5}
        height={39.5}
        x={0.25}
        y={147.25}
        stroke="#968EB0"
        rx={19.75}
      />
      <Path
        fill="#444"
        d="M20.233 172v-10.182h3.44c.796 0 1.449.136 1.96.408.51.268.887.638 1.133 1.109.245.47.368 1.005.368 1.605 0 .6-.123 1.132-.368 1.596-.246.464-.622.829-1.129 1.094-.507.262-1.155.393-1.944.393H20.91v-1.114h2.744c.544 0 .982-.079 1.313-.239.335-.159.577-.384.726-.676.152-.295.229-.646.229-1.054 0-.407-.077-.764-.23-1.069a1.565 1.565 0 00-.73-.706c-.335-.169-.777-.253-1.327-.253h-2.168V172h-1.233zm4.793-4.574L27.53 172H26.1l-2.465-4.574h1.392zm7.123 4.733c-.736 0-1.37-.162-1.905-.487a3.273 3.273 0 01-1.227-1.372c-.285-.59-.428-1.276-.428-2.059 0-.782.143-1.471.428-2.068.288-.6.689-1.067 1.203-1.402.517-.338 1.12-.507 1.81-.507.397 0 .79.066 1.178.199.387.133.74.348 1.059.646.318.295.571.686.76 1.174.19.487.283 1.087.283 1.799v.498h-5.886v-1.015h4.693a2.5 2.5 0 00-.258-1.153 1.943 1.943 0 00-.726-.8c-.312-.196-.68-.294-1.104-.294-.467 0-.871.116-1.213.348a2.291 2.291 0 00-.78.895 2.628 2.628 0 00-.274 1.183v.676c0 .577.1 1.066.299 1.467.202.398.482.701.84.91.358.205.774.308 1.248.308.308 0 .586-.043.835-.129a1.79 1.79 0 00.651-.398 1.82 1.82 0 00.423-.666l1.133.318a2.52 2.52 0 01-.601 1.014c-.282.289-.63.514-1.044.676-.415.16-.88.239-1.397.239zm4.946-.159v-7.636h1.134v1.193h.1c.158-.408.415-.724.77-.95.355-.228.78-.343 1.278-.343.503 0 .923.115 1.257.343.338.226.602.542.79.95h.08c.196-.395.49-.708.88-.94.392-.235.86-.353 1.407-.353.683 0 1.242.214 1.676.642.434.424.651 1.085.651 1.983V172h-1.173v-5.111c0-.563-.154-.966-.463-1.208a1.71 1.71 0 00-1.088-.363c-.537 0-.953.163-1.248.487-.295.322-.443.73-.443 1.223V172H41.51v-5.23c0-.434-.14-.784-.422-1.049-.282-.269-.645-.403-1.09-.403a1.6 1.6 0 00-.854.244 1.839 1.839 0 00-.637.676 1.997 1.997 0 00-.238.989V172h-1.174zm12.168 0v-7.636h1.174V172h-1.174zm.597-8.909a.833.833 0 01-.592-.234.751.751 0 01-.243-.562c0-.218.08-.406.243-.561a.833.833 0 01.592-.234c.229 0 .424.078.587.234a.742.742 0 01.248.561.744.744 0 01-.248.562.817.817 0 01-.587.234zm3.899 4.315V172h-1.173v-7.636h1.133v1.193h.1c.178-.388.45-.7.815-.935.364-.238.835-.358 1.412-.358.517 0 .97.106 1.357.318.388.209.69.527.905.955.215.424.323.961.323 1.611V172h-1.173v-4.773c0-.6-.156-1.067-.468-1.402-.311-.338-.739-.507-1.282-.507-.375 0-.71.081-1.005.244a1.738 1.738 0 00-.69.711c-.17.311-.254.689-.254 1.133zm9.9 4.753c-.637 0-1.199-.161-1.686-.482-.487-.325-.868-.782-1.143-1.372-.275-.594-.413-1.295-.413-2.103 0-.802.138-1.498.413-2.088.275-.59.658-1.046 1.148-1.368.49-.321 1.057-.482 1.7-.482.498 0 .89.083 1.179.249.291.162.513.348.666.557.156.205.277.374.363.507h.1v-3.759h1.173V172h-1.134v-1.173h-.14a7.516 7.516 0 01-.367.527c-.16.208-.386.396-.681.561-.295.163-.688.244-1.178.244zm.159-1.054c.47 0 .868-.123 1.193-.368.325-.248.572-.591.74-1.029.17-.441.254-.949.254-1.526 0-.57-.083-1.069-.248-1.497-.166-.431-.411-.765-.736-1.004-.325-.242-.726-.363-1.203-.363-.497 0-.912.128-1.243.383a2.292 2.292 0 00-.741 1.029 4.093 4.093 0 00-.244 1.452c0 .543.083 1.037.249 1.481.169.441.418.792.746 1.054.331.259.742.388 1.233.388zm8.854 1.054c-.736 0-1.37-.162-1.904-.487a3.272 3.272 0 01-1.228-1.372c-.285-.59-.428-1.276-.428-2.059 0-.782.143-1.471.428-2.068.288-.6.69-1.067 1.203-1.402.517-.338 1.12-.507 1.81-.507.398 0 .79.066 1.178.199.388.133.74.348 1.059.646.318.295.572.686.76 1.174.19.487.284 1.087.284 1.799v.498h-5.886v-1.015h4.693c0-.431-.086-.815-.259-1.153a1.944 1.944 0 00-.726-.8c-.311-.196-.679-.294-1.103-.294-.468 0-.872.116-1.213.348a2.29 2.29 0 00-.78.895 2.628 2.628 0 00-.274 1.183v.676c0 .577.1 1.066.298 1.467.202.398.482.701.84.91.358.205.774.308 1.248.308.308 0 .587-.043.835-.129a1.79 1.79 0 00.652-.398c.182-.179.323-.401.422-.666l1.134.318a2.51 2.51 0 01-.602 1.014c-.282.289-.63.514-1.044.676-.414.16-.88.239-1.397.239zM77.62 172v-7.636h1.133v1.153h.08a1.84 1.84 0 01.756-.92 2.227 2.227 0 011.233-.353c.086 0 .193.002.323.005.129.004.227.009.293.015v1.193a3.665 3.665 0 00-.273-.044 2.605 2.605 0 00-.443-.035c-.371 0-.703.078-.994.234a1.713 1.713 0 00-.935 1.556V172H77.62z"
      />
      <Circle cx={325} cy={118} r={6} fill="#444" />
      <Circle cx={325} cy={167} r={6} fill="#444" />
      <Rect
        width={344.5}
        height={39.5}
        x={0.25}
        y={213.25}
        stroke="#968EB0"
        rx={19.75}
      />
      <Path
        fill="#444"
        d="M28.426 200h-1.233a2.566 2.566 0 00-1.039-1.611 2.78 2.78 0 00-.85-.417 3.39 3.39 0 00-.974-.14c-.617 0-1.175.156-1.676.468-.497.311-.893.77-1.188 1.377-.292.606-.438 1.35-.438 2.232 0 .882.146 1.626.438 2.232.295.607.691 1.066 1.188 1.377.5.312 1.06.468 1.675.468.339 0 .663-.047.975-.139.312-.093.595-.231.85-.413a2.61 2.61 0 001.04-1.616h1.232a4.102 4.102 0 01-.507 1.397c-.245.411-.55.761-.915 1.049a4.003 4.003 0 01-1.228.651 4.55 4.55 0 01-1.447.224c-.868 0-1.64-.212-2.316-.636-.676-.424-1.208-1.028-1.596-1.81-.388-.782-.582-1.71-.582-2.784 0-1.074.194-2.002.582-2.784.388-.782.92-1.385 1.596-1.81.676-.424 1.448-.636 2.316-.636.514 0 .997.075 1.447.224.454.149.864.368 1.228.656.365.285.67.633.915 1.044.245.408.414.873.507 1.397zm4.936 7.159c-.69 0-1.295-.164-1.815-.492a3.342 3.342 0 01-1.213-1.377c-.288-.59-.433-1.28-.433-2.068 0-.796.145-1.49.433-2.084a3.344 3.344 0 011.213-1.382c.52-.328 1.125-.492 1.815-.492s1.292.164 1.81.492c.52.329.924.789 1.212 1.382.292.594.438 1.288.438 2.084 0 .788-.146 1.478-.438 2.068a3.296 3.296 0 01-1.213 1.377c-.517.328-1.12.492-1.81.492zm0-1.054c.523 0 .954-.134 1.292-.403.338-.268.589-.621.751-1.059a4.05 4.05 0 00.244-1.421c0-.511-.082-.986-.244-1.427a2.405 2.405 0 00-.75-1.069c-.339-.272-.77-.408-1.293-.408-.524 0-.955.136-1.293.408a2.405 2.405 0 00-.75 1.069 4.095 4.095 0 00-.244 1.427c0 .51.081.984.243 1.421.163.438.413.791.751 1.059.338.269.769.403 1.293.403zm6.424-9.287V207h-1.173v-10.182h1.173zm5.252 10.341c-.69 0-1.295-.164-1.815-.492a3.342 3.342 0 01-1.213-1.377c-.289-.59-.433-1.28-.433-2.068 0-.796.144-1.49.433-2.084a3.344 3.344 0 011.213-1.382c.52-.328 1.125-.492 1.815-.492.689 0 1.292.164 1.81.492.52.329.924.789 1.212 1.382.292.594.438 1.288.438 2.084 0 .788-.146 1.478-.438 2.068a3.297 3.297 0 01-1.213 1.377c-.517.328-1.12.492-1.81.492zm0-1.054c.523 0 .954-.134 1.292-.403a2.37 2.37 0 00.75-1.059 4.05 4.05 0 00.244-1.421c0-.511-.08-.986-.243-1.427a2.406 2.406 0 00-.75-1.069c-.339-.272-.77-.408-1.294-.408-.523 0-.954.136-1.292.408a2.405 2.405 0 00-.75 1.069 4.095 4.095 0 00-.244 1.427c0 .51.08.984.243 1.421.163.438.413.791.75 1.059.339.269.77.403 1.294.403zm5.25.895v-7.636h1.134v1.153h.08c.139-.378.39-.684.755-.92a2.227 2.227 0 011.233-.353c.087 0 .194.002.324.005.129.004.227.009.293.015v1.193a3.702 3.702 0 00-.273-.044 2.607 2.607 0 00-.443-.035c-.371 0-.703.078-.994.234a1.756 1.756 0 00-.686.636 1.714 1.714 0 00-.249.92V207h-1.173z"
      />
      <Circle cx={47} cy={233} r={10} fill="#9DB2CE" />
      <Circle cx={103} cy={233} r={10} fill="#A5D2AC" />
      <Circle cx={75} cy={233} r={10} fill="#C04F43" />
      <Circle cx={19} cy={233} r={10} fill="#968EB0" />
      <Circle cx={159} cy={233} r={10} fill="#F59732" />
      <Circle cx={131} cy={233} r={10} fill="#99BB42" />
      <Circle cx={187} cy={233} r={10} fill="#F1867E" />
      <Circle cx={215} cy={233} r={10} fill="#FCCA1B" />
      <Circle cx={271} cy={233} r={10} fill="#6EA8D8" />
      <Circle cx={243} cy={233} r={10} fill="#4D6691" />
      <Circle cx={299} cy={233} r={10} fill="#DEB4CF" />
      <Circle cx={327} cy={233} r={10} fill="#F6AF90" />
      <Rect
        width={344.5}
        height={39.5}
        x={0.25}
        y={147.25}
        stroke="#968EB0"
        rx={19.75}
      />
      <Path
        fill="#444"
        d="M20.233 172v-10.182h3.44c.796 0 1.449.136 1.96.408.51.268.887.638 1.133 1.109.245.47.368 1.005.368 1.605 0 .6-.123 1.132-.368 1.596-.246.464-.622.829-1.129 1.094-.507.262-1.155.393-1.944.393H20.91v-1.114h2.744c.544 0 .982-.079 1.313-.239.335-.159.577-.384.726-.676.152-.295.229-.646.229-1.054 0-.407-.077-.764-.23-1.069a1.565 1.565 0 00-.73-.706c-.335-.169-.777-.253-1.327-.253h-2.168V172h-1.233zm4.793-4.574L27.53 172H26.1l-2.465-4.574h1.392zm7.123 4.733c-.736 0-1.37-.162-1.905-.487a3.273 3.273 0 01-1.227-1.372c-.285-.59-.428-1.276-.428-2.059 0-.782.143-1.471.428-2.068.288-.6.689-1.067 1.203-1.402.517-.338 1.12-.507 1.81-.507.397 0 .79.066 1.178.199.387.133.74.348 1.059.646.318.295.571.686.76 1.174.19.487.283 1.087.283 1.799v.498h-5.886v-1.015h4.693a2.5 2.5 0 00-.258-1.153 1.943 1.943 0 00-.726-.8c-.312-.196-.68-.294-1.104-.294-.467 0-.871.116-1.213.348a2.291 2.291 0 00-.78.895 2.628 2.628 0 00-.274 1.183v.676c0 .577.1 1.066.299 1.467.202.398.482.701.84.91.358.205.774.308 1.248.308.308 0 .586-.043.835-.129a1.79 1.79 0 00.651-.398 1.82 1.82 0 00.423-.666l1.133.318a2.52 2.52 0 01-.601 1.014c-.282.289-.63.514-1.044.676-.415.16-.88.239-1.397.239zm4.946-.159v-7.636h1.134v1.193h.1c.158-.408.415-.724.77-.95.355-.228.78-.343 1.278-.343.503 0 .923.115 1.257.343.338.226.602.542.79.95h.08c.196-.395.49-.708.88-.94.392-.235.86-.353 1.407-.353.683 0 1.242.214 1.676.642.434.424.651 1.085.651 1.983V172h-1.173v-5.111c0-.563-.154-.966-.463-1.208a1.71 1.71 0 00-1.088-.363c-.537 0-.953.163-1.248.487-.295.322-.443.73-.443 1.223V172H41.51v-5.23c0-.434-.14-.784-.422-1.049-.282-.269-.645-.403-1.09-.403a1.6 1.6 0 00-.854.244 1.839 1.839 0 00-.637.676 1.997 1.997 0 00-.238.989V172h-1.174zm12.168 0v-7.636h1.174V172h-1.174zm.597-8.909a.833.833 0 01-.592-.234.751.751 0 01-.243-.562c0-.218.08-.406.243-.561a.833.833 0 01.592-.234c.229 0 .424.078.587.234a.742.742 0 01.248.561.744.744 0 01-.248.562.817.817 0 01-.587.234zm3.899 4.315V172h-1.173v-7.636h1.133v1.193h.1c.178-.388.45-.7.815-.935.364-.238.835-.358 1.412-.358.517 0 .97.106 1.357.318.388.209.69.527.905.955.215.424.323.961.323 1.611V172h-1.173v-4.773c0-.6-.156-1.067-.468-1.402-.311-.338-.739-.507-1.282-.507-.375 0-.71.081-1.005.244a1.738 1.738 0 00-.69.711c-.17.311-.254.689-.254 1.133zm9.9 4.753c-.637 0-1.199-.161-1.686-.482-.487-.325-.868-.782-1.143-1.372-.275-.594-.413-1.295-.413-2.103 0-.802.138-1.498.413-2.088.275-.59.658-1.046 1.148-1.368.49-.321 1.057-.482 1.7-.482.498 0 .89.083 1.179.249.291.162.513.348.666.557.156.205.277.374.363.507h.1v-3.759h1.173V172h-1.134v-1.173h-.14a7.516 7.516 0 01-.367.527c-.16.208-.386.396-.681.561-.295.163-.688.244-1.178.244zm.159-1.054c.47 0 .868-.123 1.193-.368.325-.248.572-.591.74-1.029.17-.441.254-.949.254-1.526 0-.57-.083-1.069-.248-1.497-.166-.431-.411-.765-.736-1.004-.325-.242-.726-.363-1.203-.363-.497 0-.912.128-1.243.383a2.292 2.292 0 00-.741 1.029 4.093 4.093 0 00-.244 1.452c0 .543.083 1.037.249 1.481.169.441.418.792.746 1.054.331.259.742.388 1.233.388zm8.854 1.054c-.736 0-1.37-.162-1.904-.487a3.272 3.272 0 01-1.228-1.372c-.285-.59-.428-1.276-.428-2.059 0-.782.143-1.471.428-2.068.288-.6.69-1.067 1.203-1.402.517-.338 1.12-.507 1.81-.507.398 0 .79.066 1.178.199.388.133.74.348 1.059.646.318.295.572.686.76 1.174.19.487.284 1.087.284 1.799v.498h-5.886v-1.015h4.693c0-.431-.086-.815-.259-1.153a1.944 1.944 0 00-.726-.8c-.311-.196-.679-.294-1.103-.294-.468 0-.872.116-1.213.348a2.29 2.29 0 00-.78.895 2.628 2.628 0 00-.274 1.183v.676c0 .577.1 1.066.298 1.467.202.398.482.701.84.91.358.205.774.308 1.248.308.308 0 .587-.043.835-.129a1.79 1.79 0 00.652-.398c.182-.179.323-.401.422-.666l1.134.318a2.51 2.51 0 01-.602 1.014c-.282.289-.63.514-1.044.676-.414.16-.88.239-1.397.239zM77.62 172v-7.636h1.133v1.153h.08a1.84 1.84 0 01.756-.92 2.227 2.227 0 011.233-.353c.086 0 .193.002.323.005.129.004.227.009.293.015v1.193a3.665 3.665 0 00-.273-.044 2.605 2.605 0 00-.443-.035c-.371 0-.703.078-.994.234a1.713 1.713 0 00-.935 1.556V172H77.62z"
      />
      <Circle cx={325} cy={167} r={6} fill="#444" />
      <Rect
        width={344.5}
        height={39.5}
        x={0.25}
        y={213.25}
        stroke="#968EB0"
        rx={19.75}
      />
      <Path
        fill="#444"
        d="M28.426 200h-1.233a2.566 2.566 0 00-1.039-1.611 2.78 2.78 0 00-.85-.417 3.39 3.39 0 00-.974-.14c-.617 0-1.175.156-1.676.468-.497.311-.893.77-1.188 1.377-.292.606-.438 1.35-.438 2.232 0 .882.146 1.626.438 2.232.295.607.691 1.066 1.188 1.377.5.312 1.06.468 1.675.468.339 0 .663-.047.975-.139.312-.093.595-.231.85-.413a2.61 2.61 0 001.04-1.616h1.232a4.102 4.102 0 01-.507 1.397c-.245.411-.55.761-.915 1.049a4.003 4.003 0 01-1.228.651 4.55 4.55 0 01-1.447.224c-.868 0-1.64-.212-2.316-.636-.676-.424-1.208-1.028-1.596-1.81-.388-.782-.582-1.71-.582-2.784 0-1.074.194-2.002.582-2.784.388-.782.92-1.385 1.596-1.81.676-.424 1.448-.636 2.316-.636.514 0 .997.075 1.447.224.454.149.864.368 1.228.656.365.285.67.633.915 1.044.245.408.414.873.507 1.397zm4.936 7.159c-.69 0-1.295-.164-1.815-.492a3.342 3.342 0 01-1.213-1.377c-.288-.59-.433-1.28-.433-2.068 0-.796.145-1.49.433-2.084a3.344 3.344 0 011.213-1.382c.52-.328 1.125-.492 1.815-.492s1.292.164 1.81.492c.52.329.924.789 1.212 1.382.292.594.438 1.288.438 2.084 0 .788-.146 1.478-.438 2.068a3.296 3.296 0 01-1.213 1.377c-.517.328-1.12.492-1.81.492zm0-1.054c.523 0 .954-.134 1.292-.403.338-.268.589-.621.751-1.059a4.05 4.05 0 00.244-1.421c0-.511-.082-.986-.244-1.427a2.405 2.405 0 00-.75-1.069c-.339-.272-.77-.408-1.293-.408-.524 0-.955.136-1.293.408a2.405 2.405 0 00-.75 1.069 4.095 4.095 0 00-.244 1.427c0 .51.081.984.243 1.421.163.438.413.791.751 1.059.338.269.769.403 1.293.403zm6.424-9.287V207h-1.173v-10.182h1.173zm5.252 10.341c-.69 0-1.295-.164-1.815-.492a3.342 3.342 0 01-1.213-1.377c-.289-.59-.433-1.28-.433-2.068 0-.796.144-1.49.433-2.084a3.344 3.344 0 011.213-1.382c.52-.328 1.125-.492 1.815-.492.689 0 1.292.164 1.81.492.52.329.924.789 1.212 1.382.292.594.438 1.288.438 2.084 0 .788-.146 1.478-.438 2.068a3.297 3.297 0 01-1.213 1.377c-.517.328-1.12.492-1.81.492zm0-1.054c.523 0 .954-.134 1.292-.403a2.37 2.37 0 00.75-1.059 4.05 4.05 0 00.244-1.421c0-.511-.08-.986-.243-1.427a2.406 2.406 0 00-.75-1.069c-.339-.272-.77-.408-1.294-.408-.523 0-.954.136-1.292.408a2.405 2.405 0 00-.75 1.069 4.095 4.095 0 00-.244 1.427c0 .51.08.984.243 1.421.163.438.413.791.75 1.059.339.269.77.403 1.294.403zm5.25.895v-7.636h1.134v1.153h.08c.139-.378.39-.684.755-.92a2.227 2.227 0 011.233-.353c.087 0 .194.002.324.005.129.004.227.009.293.015v1.193a3.702 3.702 0 00-.273-.044 2.607 2.607 0 00-.443-.035c-.371 0-.703.078-.994.234a1.756 1.756 0 00-.686.636 1.714 1.714 0 00-.249.92V207h-1.173z"
      />
      <Circle cx={47} cy={233} r={10} fill="#9DB2CE" />
      <Circle cx={103} cy={233} r={10} fill="#A5D2AC" />
      <Circle cx={75} cy={233} r={10} fill="#C04F43" />
      <Circle cx={19} cy={233} r={10} fill="#968EB0" />
      <Circle cx={159} cy={233} r={10} fill="#F59732" />
      <Circle cx={131} cy={233} r={10} fill="#99BB42" />
      <Circle cx={187} cy={233} r={10} fill="#F1867E" />
      <Circle cx={215} cy={233} r={10} fill="#FCCA1B" />
      <Circle cx={271} cy={233} r={10} fill="#6EA8D8" />
      <Circle cx={243} cy={233} r={10} fill="#4D6691" />
      <Circle cx={299} cy={233} r={10} fill="#DEB4CF" />
      <Circle cx={327} cy={233} r={10} fill="#F6AF90" />
      <Circle cx={325} cy={69} r={6} fill="#444" />
    </Svg>
  );
}

export default AddTaskGroup;
