perl -i -p -e"s/url: '/url: '\/platform/g" $(ack -f src/api/base_river)
perl -i -p -e"s/url: '/url: '\/platform/g" $(ack -f src/api/base_lake)
perl -i -p -e"s/url: '/url: '\/platform/g" $(ack -f src/api/base_section)
perl -i -p -e"s/url: '/url: '\/platform/g" $(ack -f src/api/base_water)
perl -i -p -e"s/url: '/url: '\/platform/g" $(ack -f src/api/base_project)
perl -i -p -e"s/url: '/url: '\/platform/g" $(ack -f src/api/monitor_rain)
perl -i -p -e"s/url: '/url: '\/platform/g" $(ack -f src/api/monitor_river)
perl -i -p -e"s/url: '/url: '\/platform/g" $(ack -f src/api/monitor_lake)
perl -i -p -e"s/url: '/url: '\/platform/g" $(ack -f src/api/monitor_project)
perl -i -p -e"s/url: '/url: '\/platform/g" $(ack -f src/api/monitor_water)
perl -i -p -e"s/url: '/url: '\/platform/g" $(ack -f src/api/predict_sq)
perl -i -p -e"s/url: '/url: '\/platform/g" $(ack -f src/api/predict_weather)
