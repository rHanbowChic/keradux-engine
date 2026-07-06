import os

def count_lines_in_files(directory, extensions):
    """
    计算指定目录及其子目录中指定扩展名文件的总代码行数。

    :param directory: 文件夹路径
    :param extensions: 要统计的文件扩展名列表，例如 [".ts", ".js"]
    :return: 文件数量和总代码行数
    """
    total_lines = 0
    total_files = 0

    for root, _, files in os.walk(directory):
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                        line_count = len(lines)
                        total_lines += line_count
                        total_files += 1
                except (UnicodeDecodeError, FileNotFoundError) as e:
                    print(f"Error reading {file_path}: {e}")

    return total_files, total_lines

if __name__ == "__main__":
    directory = input("Enter the directory path to scan: ")
    extensions = [".ts", ".js"]

    files_count, lines_count = count_lines_in_files(directory, extensions)

    print(f"Total .ts and .js files: {files_count}")
    print(f"Total lines of code: {lines_count}")
