// vite.config.js
import { defineConfig, transformWithEsbuild } from "file:///A:/HotelBooking/hotel-booking-client-employee/node_modules/vite/dist/node/index.js";
import react from "file:///A:/HotelBooking/hotel-booking-client-employee/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  server: {
    port: 3001
  },
  plugins: [
    react(),
    // Workaround
    {
      name: "load+transform-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) {
          return null;
        }
        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic"
          // 👈 this is important
        });
      }
    }
    // End workaround
  ],
  // Workaround before renaming .js to .jsx
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx"
      }
    }
  }
  // End workaround
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJBOlxcXFxIb3RlbEJvb2tpbmdcXFxcaG90ZWwtYm9va2luZy1jbGllbnQtZW1wbG95ZWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkE6XFxcXEhvdGVsQm9va2luZ1xcXFxob3RlbC1ib29raW5nLWNsaWVudC1lbXBsb3llZVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQTovSG90ZWxCb29raW5nL2hvdGVsLWJvb2tpbmctY2xpZW50LWVtcGxveWVlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCB0cmFuc2Zvcm1XaXRoRXNidWlsZCB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcblx0c2VydmVyOiB7XHJcbiAgICBwb3J0OiAzMDAxLFxyXG4gIH0sXHJcblx0cGx1Z2luczogW1xyXG5cdFx0cmVhY3QoKSxcclxuXHJcblx0XHQvLyBXb3JrYXJvdW5kXHJcblx0XHR7XHJcblx0XHRcdG5hbWU6ICdsb2FkK3RyYW5zZm9ybS1qcy1maWxlcy1hcy1qc3gnLFxyXG5cdFx0XHRhc3luYyB0cmFuc2Zvcm0oY29kZSwgaWQpIHtcclxuXHRcdFx0XHRpZiAoIWlkLm1hdGNoKC9zcmNcXC8uKlxcLmpzJC8pKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gVXNlIHRoZSBleHBvc2VkIHRyYW5zZm9ybSBmcm9tIHZpdGUsIGluc3RlYWQgb2YgZGlyZWN0bHlcclxuXHRcdFx0XHQvLyB0cmFuc2Zvcm1pbmcgd2l0aCBlc2J1aWxkXHJcblx0XHRcdFx0cmV0dXJuIHRyYW5zZm9ybVdpdGhFc2J1aWxkKGNvZGUsIGlkLCB7XHJcblx0XHRcdFx0XHRsb2FkZXI6ICdqc3gnLFxyXG5cdFx0XHRcdFx0anN4OiAnYXV0b21hdGljJyAvLyBcdUQ4M0RcdURDNDggdGhpcyBpcyBpbXBvcnRhbnRcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHQvLyBFbmQgd29ya2Fyb3VuZFxyXG5cdF0sXHJcblxyXG5cdC8vIFdvcmthcm91bmQgYmVmb3JlIHJlbmFtaW5nIC5qcyB0byAuanN4XHJcblx0b3B0aW1pemVEZXBzOiB7XHJcblx0XHRlc2J1aWxkT3B0aW9uczoge1xyXG5cdFx0XHRsb2FkZXI6IHtcclxuXHRcdFx0XHQnLmpzJzogJ2pzeCdcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHQvLyBFbmQgd29ya2Fyb3VuZFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStULFNBQVMsY0FBYyw0QkFBNEI7QUFDbFgsT0FBTyxXQUFXO0FBRWxCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFFBQVE7QUFBQSxJQUNMLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDRCxTQUFTO0FBQUEsSUFDUixNQUFNO0FBQUE7QUFBQSxJQUdOO0FBQUEsTUFDQyxNQUFNO0FBQUEsTUFDTixNQUFNLFVBQVUsTUFBTSxJQUFJO0FBQ3pCLFlBQUksQ0FBQyxHQUFHLE1BQU0sY0FBYyxHQUFHO0FBQzlCLGlCQUFPO0FBQUEsUUFDUjtBQUlBLGVBQU8scUJBQXFCLE1BQU0sSUFBSTtBQUFBLFVBQ3JDLFFBQVE7QUFBQSxVQUNSLEtBQUs7QUFBQTtBQUFBLFFBQ04sQ0FBQztBQUFBLE1BQ0Y7QUFBQSxJQUNEO0FBQUE7QUFBQSxFQUVEO0FBQUE7QUFBQSxFQUdBLGNBQWM7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLE1BQ2YsUUFBUTtBQUFBLFFBQ1AsT0FBTztBQUFBLE1BQ1I7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBO0FBRUQsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
