'use strict';"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var browser_platform_location_1 = require('angular2/src/router/location/browser_platform_location');
var di_1 = require('angular2/src/core/di');
var messaging_api_1 = require('angular2/src/web_workers/shared/messaging_api');
var service_message_broker_1 = require('angular2/src/web_workers/shared/service_message_broker');
var serializer_1 = require('angular2/src/web_workers/shared/serializer');
var bind_1 = require('./bind');
var serialized_types_1 = require('angular2/src/web_workers/shared/serialized_types');
var message_bus_1 = require('angular2/src/web_workers/shared/message_bus');
var async_1 = require('angular2/src/facade/async');
var MessageBasedPlatformLocation = (function () {
    function MessageBasedPlatformLocation(_brokerFactory, _platformLocation, bus, _serializer) {
        this._brokerFactory = _brokerFactory;
        this._platformLocation = _platformLocation;
        this._serializer = _serializer;
        this._platformLocation.onPopState(bind_1.bind(this._sendUrlChangeEvent, this));
        this._platformLocation.onHashChange(bind_1.bind(this._sendUrlChangeEvent, this));
        this._broker = this._brokerFactory.createMessageBroker(messaging_api_1.ROUTER_CHANNEL);
        this._channelSink = bus.to(messaging_api_1.ROUTER_CHANNEL);
    }
    MessageBasedPlatformLocation.prototype.start = function () {
        this._broker.registerMethod("getLocation", null, bind_1.bind(this._getLocation, this), serialized_types_1.LocationType);
        this._broker.registerMethod("setPathname", [serializer_1.PRIMITIVE], bind_1.bind(this._setPathname, this));
        this._broker.registerMethod("pushState", [serializer_1.PRIMITIVE, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._platformLocation.pushState, this._platformLocation));
        this._broker.registerMethod("replaceState", [serializer_1.PRIMITIVE, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._platformLocation.replaceState, this._platformLocation));
        this._broker.registerMethod("forward", null, bind_1.bind(this._platformLocation.forward, this._platformLocation));
        this._broker.registerMethod("back", null, bind_1.bind(this._platformLocation.back, this._platformLocation));
    };
    MessageBasedPlatformLocation.prototype._getLocation = function () {
        return async_1.PromiseWrapper.resolve(this._platformLocation.location);
    };
    MessageBasedPlatformLocation.prototype._sendUrlChangeEvent = function (e) {
        var loc = this._serializer.serialize(this._platformLocation.location, serialized_types_1.LocationType);
        var serializedEvent = { 'type': e.type };
        async_1.ObservableWrapper.callEmit(this._channelSink, { 'event': serializedEvent, 'location': loc });
    };
    MessageBasedPlatformLocation.prototype._setPathname = function (pathname) { this._platformLocation.pathname = pathname; };
    MessageBasedPlatformLocation = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [service_message_broker_1.ServiceMessageBrokerFactory, browser_platform_location_1.BrowserPlatformLocation, message_bus_1.MessageBus, serializer_1.Serializer])
    ], MessageBasedPlatformLocation);
    return MessageBasedPlatformLocation;
}());
exports.MessageBasedPlatformLocation = MessageBasedPlatformLocation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLU12V1N6bDdwLnRtcC9hbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkvcGxhdGZvcm1fbG9jYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDBDQUFzQyx3REFBd0QsQ0FBQyxDQUFBO0FBQy9GLG1CQUF5QixzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELDhCQUE2QiwrQ0FBK0MsQ0FBQyxDQUFBO0FBQzdFLHVDQUdPLHdEQUF3RCxDQUFDLENBQUE7QUFDaEUsMkJBQW9DLDRDQUE0QyxDQUFDLENBQUE7QUFDakYscUJBQW1CLFFBQVEsQ0FBQyxDQUFBO0FBQzVCLGlDQUEyQixrREFBa0QsQ0FBQyxDQUFBO0FBQzlFLDRCQUF5Qiw2Q0FBNkMsQ0FBQyxDQUFBO0FBQ3ZFLHNCQUE4RCwyQkFBMkIsQ0FBQyxDQUFBO0FBSTFGO0lBSUUsc0NBQW9CLGNBQTJDLEVBQzNDLGlCQUEwQyxFQUFFLEdBQWUsRUFDM0QsV0FBdUI7UUFGdkIsbUJBQWMsR0FBZCxjQUFjLENBQTZCO1FBQzNDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBeUI7UUFDMUMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDekMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBb0IsV0FBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQW9CLFdBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM3RixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsOEJBQWMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyw4QkFBYyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELDRDQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLFdBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFLCtCQUFZLENBQUMsQ0FBQztRQUM5RixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxzQkFBUyxDQUFDLEVBQUUsV0FBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxzQkFBUyxFQUFFLHNCQUFTLEVBQUUsc0JBQVMsQ0FBQyxFQUM5QyxXQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQzVGLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDLHNCQUFTLEVBQUUsc0JBQVMsRUFBRSxzQkFBUyxDQUFDLEVBQ2pELFdBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDL0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLElBQUksRUFDZixXQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQzFGLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQ1osV0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRU8sbURBQVksR0FBcEI7UUFDRSxNQUFNLENBQUMsc0JBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFHTywwREFBbUIsR0FBM0IsVUFBNEIsQ0FBUTtRQUNsQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLCtCQUFZLENBQUMsQ0FBQztRQUNwRixJQUFJLGVBQWUsR0FBRyxFQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUM7UUFDdkMseUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFTyxtREFBWSxHQUFwQixVQUFxQixRQUFnQixJQUFVLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztJQXRDOUY7UUFBQyxlQUFVLEVBQUU7O29DQUFBO0lBdUNiLG1DQUFDO0FBQUQsQ0FBQyxBQXRDRCxJQXNDQztBQXRDWSxvQ0FBNEIsK0JBc0N4QyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3JvdXRlci9sb2NhdGlvbi9icm93c2VyX3BsYXRmb3JtX2xvY2F0aW9uJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtST1VURVJfQ0hBTk5FTH0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdpbmdfYXBpJztcbmltcG9ydCB7XG4gIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgU2VydmljZU1lc3NhZ2VCcm9rZXJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7UFJJTUlUSVZFLCBTZXJpYWxpemVyfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtiaW5kfSBmcm9tICcuL2JpbmQnO1xuaW1wb3J0IHtMb2NhdGlvblR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplZF90eXBlcyc7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIE9ic2VydmFibGVXcmFwcGVyLCBQcm9taXNlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge1VybENoYW5nZUxpc3RlbmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvcm91dGVyL2xvY2F0aW9uL3BsYXRmb3JtX2xvY2F0aW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VCYXNlZFBsYXRmb3JtTG9jYXRpb24ge1xuICBwcml2YXRlIF9jaGFubmVsU2luazogRXZlbnRFbWl0dGVyPE9iamVjdD47XG4gIHByaXZhdGUgX2Jyb2tlcjogU2VydmljZU1lc3NhZ2VCcm9rZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfYnJva2VyRmFjdG9yeTogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgICAgICAgICAgICBwcml2YXRlIF9wbGF0Zm9ybUxvY2F0aW9uOiBCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbiwgYnVzOiBNZXNzYWdlQnVzLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyKSB7XG4gICAgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5vblBvcFN0YXRlKDxVcmxDaGFuZ2VMaXN0ZW5lcj5iaW5kKHRoaXMuX3NlbmRVcmxDaGFuZ2VFdmVudCwgdGhpcykpO1xuICAgIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ub25IYXNoQ2hhbmdlKDxVcmxDaGFuZ2VMaXN0ZW5lcj5iaW5kKHRoaXMuX3NlbmRVcmxDaGFuZ2VFdmVudCwgdGhpcykpO1xuICAgIHRoaXMuX2Jyb2tlciA9IHRoaXMuX2Jyb2tlckZhY3RvcnkuY3JlYXRlTWVzc2FnZUJyb2tlcihST1VURVJfQ0hBTk5FTCk7XG4gICAgdGhpcy5fY2hhbm5lbFNpbmsgPSBidXMudG8oUk9VVEVSX0NIQU5ORUwpO1xuICB9XG5cbiAgc3RhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwiZ2V0TG9jYXRpb25cIiwgbnVsbCwgYmluZCh0aGlzLl9nZXRMb2NhdGlvbiwgdGhpcyksIExvY2F0aW9uVHlwZSk7XG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwic2V0UGF0aG5hbWVcIiwgW1BSSU1JVElWRV0sIGJpbmQodGhpcy5fc2V0UGF0aG5hbWUsIHRoaXMpKTtcbiAgICB0aGlzLl9icm9rZXIucmVnaXN0ZXJNZXRob2QoXCJwdXNoU3RhdGVcIiwgW1BSSU1JVElWRSwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ucHVzaFN0YXRlLCB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uKSk7XG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwicmVwbGFjZVN0YXRlXCIsIFtQUklNSVRJVkUsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLnJlcGxhY2VTdGF0ZSwgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbikpO1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZChcImZvcndhcmRcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmZvcndhcmQsIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24pKTtcbiAgICB0aGlzLl9icm9rZXIucmVnaXN0ZXJNZXRob2QoXCJiYWNrXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5iYWNrLCB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uKSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRMb2NhdGlvbigpOiBQcm9taXNlPExvY2F0aW9uPiB7XG4gICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLnJlc29sdmUodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5sb2NhdGlvbik7XG4gIH1cblxuXG4gIHByaXZhdGUgX3NlbmRVcmxDaGFuZ2VFdmVudChlOiBFdmVudCk6IHZvaWQge1xuICAgIGxldCBsb2MgPSB0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZSh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmxvY2F0aW9uLCBMb2NhdGlvblR5cGUpO1xuICAgIGxldCBzZXJpYWxpemVkRXZlbnQgPSB7J3R5cGUnOiBlLnR5cGV9O1xuICAgIE9ic2VydmFibGVXcmFwcGVyLmNhbGxFbWl0KHRoaXMuX2NoYW5uZWxTaW5rLCB7J2V2ZW50Jzogc2VyaWFsaXplZEV2ZW50LCAnbG9jYXRpb24nOiBsb2N9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldFBhdGhuYW1lKHBhdGhuYW1lOiBzdHJpbmcpOiB2b2lkIHsgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5wYXRobmFtZSA9IHBhdGhuYW1lOyB9XG59XG4iXX0=