export default function DeveloperInfo () {
    return (
        <div className="text-center">
            <p className="text-sm text-gray-400">Crafted with ❤️ by</p>
            <p className="text-sm font-semibold text-gray-300">Dip Kor Imon</p>
            <div className="mt-2 flex justify-center gap-4 text-gray-400 text-sm">
                <a
                    href="https://www.linkedin.com/in/dipkorimon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                >
                    LinkedIn
                </a>
                <a
                    href="mailto:dipkorimon@gmail.com"
                    className="link"
                >
                    Email
                </a>
                <a
                    href="https://github.com/dipkorimon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                >
                    GitHub
                </a>
            </div>
        </div>
    )
}