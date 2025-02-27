// vite.config.ts
import react from "file:///D:/%D1%80%D0%B5%D0%BF%D0%BE%D0%B7%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%B8/%D1%81%D1%82%D0%B0%D0%B6%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0-redcat/increase-productivity/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///D:/%D1%80%D0%B5%D0%BF%D0%BE%D0%B7%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%B8/%D1%81%D1%82%D0%B0%D0%B6%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0-redcat/increase-productivity/frontend/node_modules/vite/dist/node/index.js";
import svgr from "file:///D:/%D1%80%D0%B5%D0%BF%D0%BE%D0%B7%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%B8/%D1%81%D1%82%D0%B0%D0%B6%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0-redcat/increase-productivity/frontend/node_modules/vite-plugin-svgr/dist/index.js";
var vite_config_default = defineConfig({
  base: "/hr/",
  plugins: [
    react(),
    svgr({
      include: "**/*.svg"
    })
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }]
  },
  define: {
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify(
      "https://increase-productivity.abdrashitov-academy.ru/api"
    )
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTA0NDBcdTA0MzVcdTA0M0ZcdTA0M0VcdTA0MzdcdTA0MzhcdTA0NDJcdTA0M0VcdTA0NDBcdTA0MzhcdTA0MzhcXFxcXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDM2XHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDNBXHUwNDMwLXJlZGNhdFxcXFxpbmNyZWFzZS1wcm9kdWN0aXZpdHlcXFxcZnJvbnRlbmRcXFxcYXBwc1xcXFxoclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcXHUwNDQwXHUwNDM1XHUwNDNGXHUwNDNFXHUwNDM3XHUwNDM4XHUwNDQyXHUwNDNFXHUwNDQwXHUwNDM4XHUwNDM4XFxcXFx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzNlx1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzQVx1MDQzMC1yZWRjYXRcXFxcaW5jcmVhc2UtcHJvZHVjdGl2aXR5XFxcXGZyb250ZW5kXFxcXGFwcHNcXFxcaHJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LyVEMSU4MCVEMCVCNSVEMCVCRiVEMCVCRSVEMCVCNyVEMCVCOCVEMSU4MiVEMCVCRSVEMSU4MCVEMCVCOCVEMCVCOC8lRDElODElRDElODIlRDAlQjAlRDAlQjYlRDAlQjglRDElODAlRDAlQkUlRDAlQjIlRDAlQkElRDAlQjAtcmVkY2F0L2luY3JlYXNlLXByb2R1Y3Rpdml0eS9mcm9udGVuZC9hcHBzL2hyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCBzdmdyIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBiYXNlOiAnL2hyLycsXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIHN2Z3Ioe1xyXG4gICAgICBpbmNsdWRlOiAnKiovKi5zdmcnLFxyXG4gICAgfSksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW3sgZmluZDogJ0AnLCByZXBsYWNlbWVudDogJy9zcmMnIH1dLFxyXG4gIH0sXHJcbiAgZGVmaW5lOiB7XHJcbiAgICBfX0lTX0RFVl9fOiBKU09OLnN0cmluZ2lmeSh0cnVlKSxcclxuICAgIF9fQVBJX186IEpTT04uc3RyaW5naWZ5KFxyXG4gICAgICAnaHR0cHM6Ly9pbmNyZWFzZS1wcm9kdWN0aXZpdHkuYWJkcmFzaGl0b3YtYWNhZGVteS5ydS9hcGknLFxyXG4gICAgKSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4ZixPQUFPLFdBQVc7QUFDaGhCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sVUFBVTtBQUVqQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSCxTQUFTO0FBQUEsSUFDWCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTyxDQUFDLEVBQUUsTUFBTSxLQUFLLGFBQWEsT0FBTyxDQUFDO0FBQUEsRUFDNUM7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLFlBQVksS0FBSyxVQUFVLElBQUk7QUFBQSxJQUMvQixTQUFTLEtBQUs7QUFBQSxNQUNaO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
