export interface SpotifyPlaylistsResponse {
    message: string;
    playlists: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: SimplifiedPlaylistObject[];
    };
}

export interface SimplifiedPlaylistObject {
    collaborative: boolean;
    description: string | null;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: Owner;
    public: boolean | null;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
}
interface Tracks {
    href: string;
    total: number;
}

interface ExternalUrls {
    spotify: string;
}

interface Image {
    url: string;
    height: number;
    width: number;
}

interface Owner {
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
}

interface Followers {
    href: string | null;
    total: number;
}