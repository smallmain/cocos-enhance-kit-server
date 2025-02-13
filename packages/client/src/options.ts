/**
 * 配置选项
 */
export interface Options {
    /**
     * 自动上报未烘焙的字符数据
     * 
     * @default false
     */
    autoUploadUnbakedChar?: boolean;

    /**
     * 自动上报未烘焙的字符数据的间隔时间，单位毫秒
     * 
     * 仅在 {@link autoUploadUnbakedChar} 为 `true` 时有效
     * 
     * @default 10000
     */
    autoUploadUnbakedCharInterval?: number;
}
