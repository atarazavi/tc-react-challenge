export interface SpotifyAlbumsResponse {
    albums: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: AlbumItem[];
    };
}

export interface AlbumItem {
    album_type: AlbumType;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: ReleaseDatePrecision;
    restrictions: Restriction;
    type: string;
    uri: string;
    artists: Artist[];
}
interface ExternalUrls {
    spotify: string;
}

interface Image {
    url: string;
    height: number;
    width: number;
}

export interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}
// Enum to ensure that album_type gets one of the allowed values
export enum AlbumType {
    Album = 'album',
    Single = 'single',
    Compilation = 'compilation'
}
// Enum to ensure that release_date_precision gets one of the allowed values
export enum ReleaseDatePrecision {
    Year = 'year',
    Month = 'month',
    Day = 'day'
}
// Enum to ensure that restriction gets one of the allowed values
export enum Restriction {
    Market = 'market',
    Product = 'product',
    Explicit = 'explicit'
}